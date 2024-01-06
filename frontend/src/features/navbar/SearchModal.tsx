import { fetcher } from "@/providers/api/fetchers";
import { MovieData } from "@/providers/interfaces/movieDataTypes";
import {
  ArrowDownIcon,
  ArrowUpDownIcon,
  ArrowUpIcon,
  Search2Icon,
} from "@chakra-ui/icons";
import {
  Button,
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
  const [sortOrder, setSortOrder] = useState("asc");
  const [sortCriteria, setSortCriteria] = useState("");

  const handleSortClick = (criteria: string) => {
    if (criteria === sortCriteria) {
      setSortOrder((prevOrder) => (prevOrder === "asc" ? "desc" : "asc"));
    } else {
      setSortCriteria(criteria);
      setSortOrder("asc");
    }
  };
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
        const hasMatchingGenre = movie.genre
          .toLowerCase()
          .includes(lowerCaseInput);
        return (
          hasMatchingTitle ||
          hasMatchingActor ||
          hasMatchingDirector ||
          hasMatchingDate ||
          hasMatchingGenre
        );
      })
    : [];

  const sortedMovies = filteredMovies.slice().sort((a, b) => {
    if (sortCriteria === "alphabetical") {
      return sortOrder === "asc"
        ? a.title.localeCompare(b.title)
        : b.title.localeCompare(a.title);
    } else if (sortCriteria === "productionDate") {
      return sortOrder === "asc"
        ? Number(a.productionYear) - Number(b.productionYear)
        : Number(b.productionYear) - Number(a.productionYear);
    }
    return 0;
  });
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
              {sortedMovies.length === 0 || input === "" ? null : (
                <>
                  <Divider w="90%" alignSelf="center" />
                  <Flex px="32px" fontSize="14px" justify="space-between">
                    <Text>Sortuj: </Text>
                    <Button
                      variant="link"
                      fontWeight={500}
                      fontSize="14px"
                      onClick={() => handleSortClick("alphabetical")}
                      rightIcon={
                        sortCriteria === "alphabetical" ? (
                          sortOrder === "asc" ? (
                            <ArrowUpIcon w={3} h={3} />
                          ) : (
                            <ArrowDownIcon w={3} h={3} />
                          )
                        ) : (
                          <ArrowUpDownIcon w={3} h={3} />
                        )
                      }
                    >
                      alfabetycznie
                    </Button>
                    <Button
                      variant="link"
                      fontWeight={500}
                      fontSize="14px"
                      onClick={() => handleSortClick("productionDate")}
                      rightIcon={
                        sortCriteria === "productionDate" ? (
                          sortOrder === "asc" ? (
                            <ArrowUpIcon w={3} h={3} />
                          ) : (
                            <ArrowDownIcon w={3} h={3} />
                          )
                        ) : (
                          <ArrowUpDownIcon w={3} h={3} />
                        )
                      }
                    >
                      według roku produkcji
                    </Button>
                  </Flex>
                  <Divider w="90%" alignSelf="center" mb="24px" />
                  <Stack maxH="500px" align="center" pb="24px" overflowY="auto">
                    {sortedMovies.map((movie) => (
                      <Card
                        _hover={{ bg: "#342a08", color: "white" }}
                        key={movie.movieId}
                        as="a"
                        href={`/list/${movie.movieId}`}
                        w="90%"
                        bg="#fcf7e9"
                        pl="16px"
                        py="8px"
                      >
                        <Flex justify="space-between">
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
                          <Text
                            alignSelf="flex-end"
                            pr="8px"
                            fontSize="14px"
                            fontWeight={700}
                          >
                            {movie.genre.toLowerCase()}
                          </Text>
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
