import { Box, Grid, GridItem, HStack, Stack, Text } from "@chakra-ui/react";
import Head from "next/head";

import { MOVIES } from "@/features/movies/movies";

const Home = () => {
  const sortedMoviesPopularity = [...MOVIES].sort(
    (a, b) => b.popularity - a.popularity
  );
  const topThreeMovies = sortedMoviesPopularity.slice(0, 3);
  const sortedMoviesDates = [...MOVIES].sort(
    (a, b) => new Date(b.addDate).getTime() - new Date(a.addDate).getTime()
  );
  const newestMovies = sortedMoviesDates.slice(0, 6);
  return (
    <>
      <Head>
        <title>MovieChecker</title>
        <meta name="description" content="Movie search app" />
      </Head>
      <HStack align="center" h="90vh" justify="center" spacing={10}>
        <Stack w="35vw" h="60vh">
          <Text fontSize="26px" fontWeight="700">
            Polecane filmy
          </Text>
          <Grid templateColumns="repeat(2, 1fr)" gap={4} h="100%">
            {topThreeMovies.map((movie, index) => (
              <GridItem
                key={index}
                bg="gray"
                colSpan={index === 0 ? 2 : 1}
                as="a"
                href={`list/${movie.title}`}
                _hover={{
                  bg: "#d3eaf2",
                  transition: "background-color 0.3s ease-in-out",
                }}
              >
                <p>{movie.title}</p>
              </GridItem>
            ))}
          </Grid>
        </Stack>

        <Stack w="20vw" h="60vh">
          <Text fontSize="26px" fontWeight="700">
            Ostatnio dodane
          </Text>
          <Grid templateRows="repeat(6, 1fr)" gap={4} h="100%">
            {newestMovies.map((movie) => (
              <GridItem
                key={movie.title}
                display="flex"
                as="a"
                href={`list/${movie.title}`}
                _hover={{ textDecoration: "underline" }}
                role="group"
              >
                <Box
                  bg="gray"
                  w="125px"
                  mr="15px"
                  _groupHover={{
                    bg: "#d3eaf2",
                    transition: "background-color 0.3s ease-in-out",
                  }}
                />
                <Text alignSelf="center">{movie.title}</Text>
              </GridItem>
            ))}
          </Grid>
        </Stack>
      </HStack>
    </>
  );
};

export default Home;
