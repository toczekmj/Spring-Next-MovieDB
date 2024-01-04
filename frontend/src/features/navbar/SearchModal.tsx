import { fetcher } from "@/providers/api/fetchers";
import { MovieData } from "@/providers/interfaces/movieDataTypes";
import { Search2Icon } from "@chakra-ui/icons";
import {
  Card,
  Center,
  Divider,
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
  Modal,
  ModalContent,
  ModalOverlay,
  Spinner,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";
import useSWR from "swr";

export const SearchModal = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const [input, setInput] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };
  const APIURL = `https://www.projektimdb.it/api/v1/movies`;
  const { data, error, isLoading } = useSWR<MovieData[]>(APIURL, fetcher);

  const filteredMovies = data
    ? data.filter((movie) => {
        const lowerCaseInput = input.toLowerCase();
        const hasMatchingTitle = movie.title
          .toLowerCase()
          .includes(lowerCaseInput);
        const hasMatchingActor = movie.actors.some(
          (actor) =>
            actor.firstName.toLowerCase().includes(lowerCaseInput) ||
            actor.lastName.toLowerCase().includes(lowerCaseInput)
        );
        const hasMatchingDirector = movie.director
          .toLowerCase()
          .includes(lowerCaseInput);

        const productionYear = String(movie.productionYear);

        const hasMatchingDate = productionYear.includes(lowerCaseInput);

        return (
          hasMatchingTitle ||
          hasMatchingActor ||
          hasMatchingDirector ||
          hasMatchingDate
        );
      })
    : [];

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay />
      <ModalContent>
        <>
          {isLoading || !data || error ? (
            <Stack justify="center" h="68px">
              <Center>
                <Spinner />
              </Center>
            </Stack>
          ) : (
            <>
              <InputGroup>
                <InputLeftElement pointerEvents="none" h="100%" w="64px">
                  <Search2Icon w="20px" h="20px" color="#deb522" />
                </InputLeftElement>
                <Input
                  minH="68px"
                  // fontSize="xl"
                  fontSize="18px"
                  placeholder="Wyszukaj filmy lub seriale"
                  _placeholder={{ color: "#8c8c8c" }}
                  bg="white"
                  border="none"
                  maxLength={64}
                  pl="64px"
                  outline="none"
                  _focus={{ boxShadow: "none" }}
                  onChange={handleInputChange}
                  value={input}
                />
              </InputGroup>
              {filteredMovies.length === 0 || input === "" ? null : (
                <>
                  <Divider w="90%" alignSelf="center" mb="24px" />
                  <Stack maxH="500px" align="center" pb="24px" overflowY="auto">
                    {filteredMovies.map((movie) => (
                      <Card
                        _hover={{ bg: "#342a08", color: "white" }}
                        key={movie.movieId}
                        as="a"
                        href={`/list/${movie.movieId}`}
                        w="90%"
                        bg="#f7f2ed"
                        pl="16px"
                        py="8px"
                      >
                        <Flex>
                          <Stack spacing={0} fontSize="12px">
                            <Text fontSize="18px" fontWeight={700}>
                              {movie.title}
                            </Text>
                            <Text>
                              Data produkcji: {movie.productionYear}, Reżyser:{" "}
                              {movie.director}
                            </Text>
                            <Text>
                              Aktorzy:{" "}
                              {movie.actors.slice(0, 3).map((actor, index) => (
                                <span key={index}>
                                  {actor.firstName} {actor.lastName}
                                  {index < 2 ? ", " : "..."}
                                </span>
                              ))}
                            </Text>
                          </Stack>
                        </Flex>
                      </Card>
                    ))}
                  </Stack>
                </>
              )}
            </>
          )}
        </>
      </ModalContent>
    </Modal>
  );
};
