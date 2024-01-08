import { loginAtom } from "@/features/navbar/atoms/loginAtom";
import { fetcher } from "@/providers/api/fetchers";
import { MovieData, MovieList } from "@/providers/interfaces/movieDataTypes";
import {
  ArrowDownIcon,
  ArrowUpDownIcon,
  ArrowUpIcon,
  CheckIcon,
  HamburgerIcon,
  Search2Icon,
} from "@chakra-ui/icons";
import {
  Button,
  Card,
  Center,
  Divider,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  Spinner,
  Stack,
  Text,
  Tooltip,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useAtomValue } from "jotai";
import { useRouter } from "next/router";
import React from "react";
import { useState } from "react";
import useSWR from "swr";
import useSWRMutation from "swr/mutation";

const MyList = () => {
  const isLoggedIn = useAtomValue(loginAtom);
  const [sortOrder, setSortOrder] = useState("asc");
  const [sortCriteria, setSortCriteria] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [listName, setListName] = useState("");
  const [selectedMovies, setSelectedMovies] = useState<number[]>([]);
  const [copySuccess, setCopySuccess] = useState<boolean>(false);
  const [copyLink, setCopyLink] = useState<string>("");
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setState: React.Dispatch<React.SetStateAction<string>>
  ) => {
    setState(e.target.value);
  };

  const handleSortClick = (criteria: string) => {
    if (criteria === sortCriteria) {
      setSortOrder((prevOrder) => (prevOrder === "asc" ? "desc" : "asc"));
    } else {
      setSortCriteria(criteria);
      setSortOrder("asc");
    }
  };
  const APIURL = `https://www.projektimdb.it/api/v1/movies`;

  const { data, error, isLoading } = useSWR<MovieData[]>(APIURL, fetcher, {
    refreshInterval: 1000,
  });

  const urlLists = `https://www.projektimdb.it/api/v1/lists`;
  const sendRequest = async (
    url: string,
    {
      arg,
    }: {
      arg: {
        listName: string;
        movieIds: number[];
      };
    }
  ) => {
    return fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json; charset=UTF-8" },
      body: JSON.stringify(arg),
    }).then((res) => res.json());
  };
  const { trigger } = useSWRMutation(urlLists, sendRequest);
  const toast = useToast();

  if (isLoading || !data || error) {
    return (
      <Stack justify="center" h="68px">
        <Center>
          <Spinner />
        </Center>
      </Stack>
    );
  }

  //yeah i know, it's in the SearchModal
  const filteredMovies = data
    ? data.filter((movie) => {
        const lowerCaseInput = searchInput.toLowerCase();
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

  const handleMovieClick = (movieId: number) => {
    const isSelected = selectedMovies.includes(movieId);

    if (isSelected) {
      setSelectedMovies((prevSelected) =>
        prevSelected.filter((id) => id !== movieId)
      );
    } else {
      setSelectedMovies((prevSelected) => [...prevSelected, movieId]);
    }
  };

  const selectedMoviesNames = selectedMovies.map((selectedMovie) => {
    const movie = data.find((movie) => movie.movieId === selectedMovie);

    return {
      movieId: selectedMovie,
      title: movie?.title || "",
      productionYear: movie?.productionYear || 0,
    };
  });

  const copyToClipBoard = async () => {
    try {
      await navigator.clipboard.writeText(copyLink);
      setCopySuccess(true);
      setTimeout(() => {
        setCopySuccess(false);
      }, 5000);
    } catch (err) {
      setCopySuccess(false);
    }
  };
  return !isLoggedIn ? (
    <Stack justify="center" align="center" h="80vh">
      <Text>
        Nie masz dostępu do tej strony, zaloguj się, aby móc z niej skorzystać.
      </Text>
    </Stack>
  ) : (
    <Flex w="100%" justify="space-between" py="24px">
      <Stack align="center" w="35vw">
        <InputGroup maxW="90%">
          <InputLeftElement pointerEvents="none" h="100%" w="64px">
            <Search2Icon w="20px" h="20px" color="#deb522" />
          </InputLeftElement>
          <Input
            minH="68px"
            // fontSize="xl"
            fontSize="18px"
            placeholder="Wyszukaj filmy "
            _placeholder={{ color: "#8c8c8c" }}
            bg="white"
            border="none"
            maxLength={64}
            pl="64px"
            outline="none"
            _focus={{ boxShadow: "none" }}
            onChange={(e) => handleInputChange(e, setSearchInput)}
            value={searchInput}
          />
        </InputGroup>
        <Divider w="90%" alignSelf="center" />
        <Flex px="32px" fontSize="14px" justify="space-between" w="90%">
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
        <Stack
          overflowY="auto"
          maxH="65vh"
          w="100%"
          align="center"
          sx={{
            "&::-webkit-scrollbar": {
              width: "8px",
              height: "8px",
            },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: `#342a08`,
            },
          }}
        >
          {sortedMovies.map((movie) => (
            <Card
              _hover={{ bg: "#342a08", color: "white" }}
              key={movie.movieId}
              cursor="pointer"
              w="90%"
              pl="16px"
              py="8px"
              onClick={() => handleMovieClick(movie.movieId)}
              bg={
                selectedMovies.includes(movie.movieId) ? "#342a08" : "#fcf7e9"
              }
              color={selectedMovies.includes(movie.movieId) ? "white" : "black"}
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
                <Stack
                  alignSelf="flex-end"
                  pr="8px"
                  // bg="red"
                  h="100%"
                  justify="space-between"
                >
                  <Text fontSize="14px" fontWeight={700} justifySelf="flex-end">
                    {movie.genre.toLowerCase()}
                  </Text>
                  {selectedMovies.includes(movie.movieId) ? (
                    <CheckIcon alignSelf="flex-end" justifySelf="flex-start" />
                  ) : null}
                </Stack>
              </Flex>
            </Card>
          ))}
        </Stack>
      </Stack>
      <Stack align="center" justify="center" fontWeight={700} spacing={10}>
        {selectedMovies.length === 0 ? (
          <Text>Zaznacz film z lewej, aby móc stworzyć listę</Text>
        ) : (
          <>
            <Input
              fontSize="26px"
              placeholder="Twoja lista*"
              _placeholder={{ color: "#8c8c8c" }}
              border="none"
              maxLength={64}
              outline="none"
              _focus={{ boxShadow: "none" }}
              onChange={(e) => handleInputChange(e, setListName)}
              value={listName}
            />
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
              {selectedMoviesNames.map((movie, index) => (
                <Stack key={movie.movieId}>
                  <Text mb={0}>
                    {movie.title.toUpperCase()} ({movie.productionYear})
                  </Text>
                  {index === selectedMovies.length - 1 ? null : <Divider />}
                </Stack>
              ))}
            </Stack>
            {copyLink.length !== 0 ? (
              <Button
                onClick={() => {
                  setCopyLink("");
                  setSelectedMovies([]);
                  setListName("");
                }}
                bg="#deb522"
                w="150px"
                h="40px"
                fontSize="14px"
                color="white"
                _hover={{ bg: "white", color: "black" }}
              >
                Stwórz nową listę
              </Button>
            ) : (
              <Button
                bg="#deb522"
                w="150px"
                h="40px"
                fontSize="14px"
                color="white"
                _hover={{ bg: "white", color: "black" }}
                onClick={async () => {
                  try {
                    if (listName.length === 0) {
                      toast({
                        title: "Błąd.",
                        description:
                          "Nie dodano listy, lista nie może mieć pustej nazwy.",
                        status: "error",
                        duration: 2000,
                        isClosable: true,
                      });
                      return;
                    }

                    const result = await trigger(
                      {
                        listName: listName,
                        movieIds: selectedMovies,
                      },
                      { revalidate: true }
                    );

                    setCopyLink(result.listURL);
                    toast({
                      title: "Dodano listę.",
                      description: "Pomyślnie dodano listę",
                      status: "success",
                      duration: 2000,
                      isClosable: true,
                    });
                  } catch (e) {
                    toast({
                      title: "Błąd!",
                      description: "Nie udało się dodać listy.",
                      status: "error",
                      duration: 2000,
                      isClosable: true,
                    });
                  }
                }}
              >
                Stwórz listę
              </Button>
            )}
            {copyLink.length === 0 ? null : (
              <Tooltip
                label={copySuccess ? "Skopiowano" : "Wystąpił błąd"}
                color="black"
                isOpen={copySuccess}
                closeOnClick={true}
              >
                <Button variant="link" onClick={copyToClipBoard}>
                  Podziel się listą ze znajomymi!
                </Button>
              </Tooltip>
            )}
          </>
        )}
      </Stack>
      <IconButton
        icon={<HamburgerIcon />}
        mr="16px"
        fontSize="25px"
        aria-label={"pokaż listy"}
        _hover={{ bg: "gray" }}
        onClick={onOpen}
      />
      <ListDrawer isOpen={isOpen} onClose={onClose} />
    </Flex>
  );
};

const ListDrawer = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const router = useRouter();
  const APIURL = `https://www.projektimdb.it/api/v1/lists`;

  const { data, error, isLoading } = useSWR<MovieList[]>(APIURL, fetcher, {
    refreshInterval: 1000,
  });

  return (
    <Drawer placement="right" onClose={onClose} isOpen={isOpen}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerHeader borderBottomWidth="1px">Twoje listy</DrawerHeader>
        <DrawerBody>
          {isLoading || !data || error ? (
            <Center>
              <Spinner />
            </Center>
          ) : (
            <Stack spacing={5} mt={5}>
              {data.map((list) => (
                <Flex>
                  <Text mr={5}>•</Text>
                  <Button
                    key={list.movieListId}
                    variant="link"
                    onClick={() => {
                      router.push(`lists/${list.movieListId}`);
                    }}
                    fontSize="18px"
                    w="fit-content"
                  >
                    {list.listName}
                  </Button>
                </Flex>
              ))}
            </Stack>
          )}
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};

export default MyList;
