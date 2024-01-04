import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Center,
  FormControl,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Spinner,
  Stack,
  Text,
  Textarea,
  Tooltip,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import ReactStars from "react-rating-stars-component";
import React, { useState } from "react";
import useSWR from "swr";
import { useRouter } from "next/router";
import useSWRMutation from "swr/mutation";
import { MovieData } from "@/providers/interfaces/movieDataTypes";
import {
  fetchActors,
  fetchComments,
  fetchRating,
  fetcher,
} from "@/providers/api/fetchers";
import { useAtomValue } from "jotai";
import { loginAtom } from "@/features/navbar/atoms/loginAtom";
import { bannedWords } from "@/providers/swearWords/bannedWords";

export default function SingleMoviePage() {
  const router = useRouter();
  const { id } = router.query;

  const { isOpen, onOpen, onClose } = useDisclosure();
  const isLoggedIn = useAtomValue(loginAtom);
  const APIURL = `https://www.projektimdb.it/api/v1/movies/${id as string}`;
  const POSTURL = `https://www.projektimdb.it/api/v1/movies/${
    id as string
  }/comments`;
  const { data, error } = useSWR<MovieData>(APIURL, fetcher, {
    refreshInterval: 1000,
  });
  if (error) return <div>Failed to fetch</div>;
  if (!data) {
    return (
      <Stack h="80vh" justify="center">
        <Center>
          <Spinner />
        </Center>
      </Stack>
    );
  }
  const actorsList = fetchActors(data.actors);
  const commentList = fetchComments(data.comments);

  const rating = data.rating !== null ? fetchRating(data.rating) : [];

  return (
    <Stack align="center" justifyContent="center" spacing="50px" my="100px">
      <Card w="40%" boxShadow="lg">
        <CardHeader>
          <Text fontSize="26px" fontWeight="700">
            {data?.title}
          </Text>
        </CardHeader>

        <CardBody>
          <Text>
            <b>Reżyser:</b> {data.director}
          </Text>
          <Text>
            <b>Rok produkcji:</b> {data.productionYear}
          </Text>
          <Text>
            <b>Główna obsada:</b> {actorsList}
          </Text>
          <Text>
            <b>Opinie telewidzów:</b>
          </Text>
          {rating.length === 0 ? (
            <Text>Brak ocen dla podanego filmu</Text>
          ) : (
            <>
              <Text>Aktorstwo:</Text>
              <ReactStars
                count={5}
                value={rating[1]}
                size={20}
                isHalf={true}
                edit={false}
              ></ReactStars>
              <Text>Fabuła:</Text>
              <ReactStars
                count={5}
                value={rating[0]}
                size={20}
                isHalf={true}
                edit={false}
              ></ReactStars>
              <Text>Scenografia:</Text>
              <ReactStars
                count={5}
                value={rating[2]}
                size={20}
                isHalf={true}
                edit={false}
              ></ReactStars>
            </>
          )}
        </CardBody>
      </Card>

      {/*komentarze */}
      <Card w="40%" boxShadow="lg">
        <CardHeader>
          <Text fontSize="26px" fontWeight="700">
            Komentarze
          </Text>
        </CardHeader>
        <CardBody>
          {commentList.length === 0 ? (
            <Text>Brak komentarzy dla podanego filmu</Text>
          ) : (
            <Text dangerouslySetInnerHTML={{ __html: commentList }}></Text>
          )}
        </CardBody>
      </Card>

      <Tooltip
        color="black"
        hasArrow={true}
        label="Musisz być zalogowany aby dodać komentarz!"
        isDisabled={isLoggedIn}
      >
        <Button
          bg="#deb522"
          color="white"
          onClick={onOpen}
          isDisabled={!isLoggedIn}
          _hover={{
            bg: "white",
            color: "#342a08",
            _disabled: { bg: "#deb522", color: "white" },
          }}
        >
          Dodaj komentarz
        </Button>
      </Tooltip>
      <CommentModal
        isOpen={isOpen}
        onClose={onClose}
        data={data}
        apiurl={POSTURL}
      />
    </Stack>
  );
}

const CommentModal = ({
  isOpen,
  onClose,
  data,
  apiurl,
}: {
  isOpen: boolean;
  onClose: () => void;
  apiurl: string;
  data: MovieData;
}) => {
  const [input, setInput] = useState("");
  const toast = useToast();
  //i know, it can be done way better, but there's no use to that (via useDebounce)

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
  };
  // const { mutate } = useSWRConfig();

  const sendRequest = async (
    url: string,
    { arg }: { arg: { text: string } }
  ) => {
    return fetch(url, {
      method: "PUT",
      headers: { "Content-Type": "application/json; charset=UTF-8" },
      body: JSON.stringify(arg),
    }).then((res) => res.json());
  };
  const { trigger } = useSWRMutation(apiurl, sendRequest);

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered={true} size="sm">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Dodaj komentarz</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Stack spacing={8} mx={"auto"} maxW={"lg"} py={6} px={6}>
            <Stack spacing={4}>
              <FormControl id="comment">
                <Textarea
                  value={input}
                  onChange={handleInputChange}
                  placeholder="komentarz"
                  _placeholder={{ color: "#98947e" }}
                  border={0}
                  bg="#faf8ed"
                  minH="150px"
                />
              </FormControl>
              <Stack spacing={10}>
                <Button
                  bg={"#deb522"}
                  color={"white"}
                  _hover={{
                    bg: "white",
                    color: "#342a08",
                  }}
                  onClick={async () => {
                    try {
                      if (input === "") {
                        toast({
                          title: "Błąd.",
                          description: "Komentarz nie może być pusty.",
                          status: "error",
                          duration: 2000,
                          isClosable: true,
                        });
                        return;
                      }

                      if (bannedWords.some((word) => input.includes(word))) {
                        toast({
                          title: "Błąd.",
                          description:
                            "Komentarz nie może zawierać wulgarnych słów.",
                          status: "error",
                          duration: 2000,
                          isClosable: true,
                        });
                        return;
                      }

                      const result = await trigger(
                        { text: input },
                        { revalidate: true }
                      );

                      onClose();
                      setInput("");
                      toast({
                        title: "Dodano komentarz.",
                        description: "Pomyślnie dodano komentarz",
                        status: "success",
                        duration: 2000,
                        isClosable: true,
                      });
                    } catch (e) {
                      toast({
                        title: "Błąd.",
                        description: "Nie udało się dodać komentarza.",
                        status: "error",
                        duration: 2000,
                        isClosable: true,
                      });
                    }
                  }}
                >
                  Dodaj
                </Button>
              </Stack>
            </Stack>
          </Stack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
