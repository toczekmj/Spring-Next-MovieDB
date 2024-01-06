import {
  Button,
  Center,
  Divider,
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spinner,
  Stack,
  Text,
  Tooltip,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import useSWR from "swr";
import { useRouter } from "next/router";
import useSWRMutation from "swr/mutation";
import { MovieList } from "@/providers/interfaces/movieDataTypes";
import { fetcher } from "@/providers/api/fetchers";
import { useAtomValue } from "jotai";
import { loginAtom } from "@/features/navbar/atoms/loginAtom";

export default function SingleListMovie() {
  const router = useRouter();
  const { id } = router.query;

  const { isOpen, onOpen, onClose } = useDisclosure();
  const isLoggedIn = useAtomValue(loginAtom);

  const [copySuccess, setCopySuccess] = useState<boolean>(false);

  const APIURL = `https://www.projektimdb.it/api/v1/lists/${id as string}`;

  const { data, error } = useSWR<MovieList>(APIURL, fetcher, {
    refreshInterval: 1000,
  });

  const copyToClipBoard = async () => {
    try {
      const text = data?.listURL ?? "";
      await navigator.clipboard.writeText(text);
      setCopySuccess(true);
      setTimeout(() => {
        setCopySuccess(false);
      }, 5000);
    } catch (err) {
      setCopySuccess(false);
    }
  };

  const sendRequest = async (
    url: string,
    {
      arg,
    }: {
      arg: {
        movieListId: number;
      };
    }
  ) => {
    return fetch(url, {
      method: "DELETE",
      headers: { "Content-Type": "application/json; charset=UTF-8" },
      body: JSON.stringify(arg),
    }).then((res) => res);
  };
  const { trigger } = useSWRMutation(APIURL, sendRequest, {
    onSuccess: () => {
      router.push("/");
      toast({
        title: "Usunięto listę.",
        description: "Usunięto listę.",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
    },
  });
  const toast = useToast();
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
  return (
    <Stack py="32px" justify="center" align="center" h="80vh" spacing={10}>
      <Heading>{data.listName}</Heading>

      <Stack
        spacing={3}
        textAlign="center"
        color="#fcf7e9"
        fontSize="20px"
        bg="#342a08"
        p="16px"
        borderRadius="8px"
        maxH="550px"
        overflowY="auto"
        sx={{
          "&::-webkit-scrollbar": {
            width: "8px",
            height: "8px",
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: `#deb522`,
          },
        }}
      >
        {data.movies.map((movie, index) => (
          <Stack
            as="a"
            href={`/list/${movie.movieId}`}
            _hover={{ textDecoration: "underline" }}
            key={movie.movieId}
          >
            <Text mb={0}>
              {movie.title.toUpperCase()} ({movie.productionYear})
            </Text>
            {index === data.movies.length - 1 ? null : <Divider />}
          </Stack>
        ))}
      </Stack>

      {data.listURL.length === 0 ? null : (
        <Tooltip
          label={copySuccess ? "Skopiowano" : "Wystąpił błąd"}
          color="black"
          isOpen={copySuccess}
          closeOnClick={true}
        >
          <Button variant="link" onClick={copyToClipBoard} w="fit-content">
            Podziel się listą ze znajomymi!
          </Button>
        </Tooltip>
      )}
      {isLoggedIn ? (
        <>
          <Button
            bg="red"
            color="white"
            _hover={{ bg: "white", color: "red" }}
            onClick={onOpen}
          >
            Usuń listę
          </Button>
          <Modal isOpen={isOpen} onClose={onClose} isCentered={true}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Usuń listę</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <Text>
                  Czy na pewno chcesz usunąć listę {data.listName}? Ta akcja
                  jest nieodwracalna.
                </Text>
              </ModalBody>
              <ModalFooter gap={3}>
                <Button
                  bg="red"
                  color="white"
                  _hover={{ bg: "white", color: "red" }}
                  onClick={async () => {
                    await trigger({
                      movieListId: data.movieListId,
                    });
                  }}
                >
                  Usuń
                </Button>
                <Button
                  onClick={onClose}
                  bg="#deb522"
                  color="white"
                  _hover={{ bg: "white", color: "black" }}
                >
                  Anuluj
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </>
      ) : null}
    </Stack>
  );
}
