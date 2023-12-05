import {
  Card,
  CardBody,
  CardHeader,
  Grid,
  GridItem,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";

import { MOVIES } from "@/features/movies/movies";

const SingleMoviePage = () => {
  const { query } = useRouter();

  const { id }: { id?: string } = query;

  const movie = MOVIES.find((movie) => movie.title === id);
  return (
    <Stack h="100vh" align="center" justifyContent="center" spacing={55}>
      <Card w="40%">
        <CardHeader>
          <Text fontSize="26px" fontWeight="700">
            {movie?.title}
          </Text>
        </CardHeader>
        <CardBody>
          {/* trzeba dopisac jakies rzeczy w stylu reżyser, aktorzy itd  */}

          <Text>Dodano: {movie?.addDate}</Text>
          {/* <Text>{movie?.popularity}</Text> */}
          <Text>Reżyser: ...</Text>
          <Text>Główna obsada: ...</Text>
        </CardBody>
      </Card>

      <Card w="20%">
        <CardHeader>
          <Text fontSize="26px" fontWeight="700">
            Komentarze
          </Text>
        </CardHeader>
        <CardBody>
          <Text></Text>
          <Text>Użytkownik1: Bardzo dobry film</Text>
          <Text>
            Użytkownik2: Muszę powiedzieć, że pomimo nie lubię tego reżysera,
            ten film zaskoczył mnie pozytywnie.
          </Text>
        </CardBody>
      </Card>
    </Stack>
  );
};

export default SingleMoviePage;
