import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Button,
  Card,
  Center,
  Divider,
  Flex,
  HStack,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  Spinner,
  Stack,
  Text,
  Tooltip,
} from "@chakra-ui/react";
import React, { useState } from "react";
import useSWR from "swr";
import { useRouter } from "next/router";
import { MovieData } from "@/providers/interfaces/movieDataTypes";
import { fetcher } from "@/providers/api/fetchers";
import { useAtomValue } from "jotai";
import { loginAtom } from "@/features/navbar/atoms/loginAtom";
import {
  ArrowUpIcon,
  ArrowDownIcon,
  ArrowUpDownIcon,
  Search2Icon,
} from "@chakra-ui/icons";

export default function SingleListMovie() {
  const APIURL = `https://www.projektimdb.it/api/v1/movies`;

  const [sortOrder, setSortOrder] = useState("asc");
  const [sortCriteria, setSortCriteria] = useState("");
  const [input, setInput] = useState("");
  const { data, error } = useSWR<MovieData[]>(APIURL, fetcher);
  console.log(data);

  const dataGOOD = data?.filter((movie) => movie.photoURL !== null);
  console.log(dataGOOD);
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

  const handleSortClick = (criteria: string) => {
    if (criteria === sortCriteria) {
      setSortOrder((prevOrder) => (prevOrder === "asc" ? "desc" : "asc"));
    } else {
      setSortCriteria(criteria);
      setSortOrder("asc");
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

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
    <Stack p="32px" h="80vh" spacing={5}>
      <InputGroup maxW="550px" alignSelf="center">
        <InputLeftElement pointerEvents="none" h="100%" w="64px">
          <Search2Icon w="20px" h="20px" color="#deb522" />
        </InputLeftElement>
        <Input
          minH="68px"
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
      <Divider w="90%" alignSelf="center" />
      <Flex fontSize="20px" justify="space-between" w="100%">
        <Flex w="50%" justify="space-evenly">
          <Text>Sortuj: </Text>
          <Button
            variant="link"
            fontWeight={500}
            fontSize="18px"
            onClick={() => handleSortClick("alphabetical")}
            rightIcon={
              sortCriteria === "alphabetical" ? (
                sortOrder === "asc" ? (
                  <ArrowUpIcon w={4} h={4} />
                ) : (
                  <ArrowDownIcon w={4} h={4} />
                )
              ) : (
                <ArrowUpDownIcon w={4} h={4} />
              )
            }
          >
            alfabetycznie
          </Button>
          <Button
            variant="link"
            fontWeight={500}
            fontSize="18px"
            onClick={() => handleSortClick("productionDate")}
            rightIcon={
              sortCriteria === "productionDate" ? (
                sortOrder === "asc" ? (
                  <ArrowUpIcon w={4} h={4} />
                ) : (
                  <ArrowDownIcon w={4} h={4} />
                )
              ) : (
                <ArrowUpDownIcon w={4} h={4} />
              )
            }
          >
            według roku produkcji
          </Button>
        </Flex>
        {/* <Breadcrumb w="40%">
          <BreadcrumbItem>
            <BreadcrumbLink>sciencefiction</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <BreadcrumbLink>akcja</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <BreadcrumbLink>komedia</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <BreadcrumbLink>Docs</BreadcrumbLink>
          </BreadcrumbItem>

          <BreadcrumbItem isCurrentPage>
            <BreadcrumbLink>Breadcrumb</BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb> */}
      </Flex>
      <HStack
        maxH="90vh"
        align="center"
        overflowY="auto"
        spacing={5}
        flexWrap="wrap"
        justify="space-evenly"
      >
        {sortedMovies.map((movie) => (
          <Card
            _hover={{ bg: "#342a08", color: "white" }}
            key={movie.movieId}
            as="a"
            href={`/list/${movie.movieId}`}
            w="40%"
            bg="#fcf7e9"
            pl="16px"
            py="8px"
          >
            <Flex justify="space-between">
              <Stack spacing={0} fontSize="16px">
                <Text fontSize="22px" fontWeight={700}>
                  {movie.title}
                </Text>
                <Text>
                  Data produkcji: {movie.productionYear}, Reżyser:{" "}
                  {movie.director}
                </Text>
                <Text>
                  Aktorzy:{" "}
                  {movie.actors.slice(0, 5).map((actor, index) => (
                    <span key={index}>
                      {actor.firstName} {actor.lastName}
                      {index < 4 ? ", " : "..."}
                    </span>
                  ))}
                </Text>
              </Stack>
              <Text
                alignSelf="flex-end"
                pr="8px"
                fontSize="16px"
                fontWeight={700}
              >
                {movie.genre.toLowerCase()}
              </Text>
            </Flex>
          </Card>
        ))}
      </HStack>
    </Stack>
  );
}
