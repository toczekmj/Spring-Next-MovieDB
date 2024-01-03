import { fetcher } from "@/providers/api/fetchers";
import { MovieData } from "@/providers/interfaces/movieDataTypes";
import {
  Box,
  Center,
  Grid,
  GridItem,
  HStack,
  Spinner,
  Stack,
  Text,
} from "@chakra-ui/react";
import Head from "next/head";
import useSWR from "swr";

const Home = () => {
  const APIURL = `https://www.projektimdb.it/api/v1/movies`;
  const { data, error, isLoading } = useSWR<MovieData[]>(APIURL, fetcher);

  if (error) return <div>Failed to fetch</div>;
  if (isLoading || !data) {
    return (
      <Stack h="80vh" justify="center">
        <Center>
          <Spinner />
        </Center>
      </Stack>
    );
  }

  // console.log(data[0].rating.acting);
  const sortedMoviesPopularity = data.sort((a, b) => {
    if (a.rating === null) return 1;
    if (b.rating === null) return -1;

    const sumA =
      Number(a.rating.acting) +
      Number(a.rating.plot) +
      Number(a.rating.scenography);
    const sumB =
      Number(b.rating.acting) +
      Number(b.rating.plot) +
      Number(b.rating.scenography);

    return sumB - sumA;
  });

  // console.log(sortedMoviesPopularity, "sorted");
  const topThreeMovies = sortedMoviesPopularity.slice(0, 3);

  const sortedMoviesDates = data.sort(
    (a, b) => Number(b.productionYear) - Number(a.productionYear)
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
                display="flex"
                justifyContent="center"
                alignContent="center"
                key={index}
                bg="gray"
                colSpan={index === 0 ? 2 : 1}
                as="a"
                href={`list/${movie.movieId}`}
                _hover={{
                  bg: "#d3eaf2",
                  transition: "background-color 0.3s ease-in-out",
                }}
              >
                <Text
                  fontSize="24px"
                  h="fit-content"
                  w="100%"
                  textAlign="center"
                  alignSelf="center"
                  bg="rgba(222, 181, 34, 0.5)"
                  color="white"
                >
                  {movie.title}
                </Text>
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
                href={`list/${movie.movieId}`}
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
