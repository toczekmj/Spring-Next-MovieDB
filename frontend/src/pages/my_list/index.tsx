import {
  Button,
  Center,
  Flex,
  HStack,
  Heading,
  Spinner,
  Stack,
  Text,
  Tooltip,
} from "@chakra-ui/react";
import React from "react";
import useSWR from "swr";
import { useRouter } from "next/router";
import { MovieList } from "@/providers/interfaces/movieDataTypes";
import { fetcher } from "@/providers/api/fetchers";
import { useAtomValue } from "jotai";
import { loginAtom } from "@/features/navbar/atoms/loginAtom";

export default function SingleListMovie() {
  const router = useRouter();
  const isLoggedIn = useAtomValue(loginAtom);

  const APIURL = `http://localhost:5001/api/v1/lists`;

  const { data, error } = useSWR<MovieList[]>(APIURL, fetcher);
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
    <Stack p="32px" h="80vh" spacing={10}>
      <Heading>Moje listy filmowe</Heading>
      <Flex h="100%">
        <HStack
          borderRadius="8px"
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
          flexWrap="wrap"
          maxW="50%"
          h="fit-content"
          spacing={10}
        >
          {isLoggedIn ? (
            data.map((list) => (
              <Tooltip
                label={list.listName}
                isDisabled={list.listName.length < 15 ? true : false}
                bg="black"
              >
                <Button
                  key={list.movieListId}
                  variant="link"
                  onClick={() => {
                    router.push(`lists/${list.movieListId}`);
                  }}
                  color="#fcf7e9"
                  fontSize="24px"
                  py="16px"
                  textAlign="center"
                  bg="#342a08"
                  w="200px"
                  h="80px"
                >
                  {list.listName.length > 10
                    ? `${list.listName.substring(0, 10)}...`
                    : list.listName}
                </Button>
              </Tooltip>
            ))
          ) : (
            <Text gridColumn="span 4">
              Zaloguj się aby zobaczyć swoje listy filmowe
            </Text>
          )}
        </HStack>

        <HStack
          borderRadius="8px"
          overflowY="auto"
          w="50%"
          justify="center"
          h="100%"
        >
          {isLoggedIn ? (
            <Center>
              <Button
                fontSize="24px"
                variant="link"
                onClick={() => {
                  router.push(`/create_list`);
                }}
              >
                Dodaj listę
              </Button>
            </Center>
          ) : null}
        </HStack>
      </Flex>
    </Stack>
  );
}
