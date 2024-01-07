import { fetcher } from "@/providers/api/fetchers";
import { MovieData } from "@/providers/interfaces/movieDataTypes";
import {
  Box,
  Center,
  Grid,
  Image,
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
          <Grid templateColumns="repeat(2, 1fr)" gap={4}>
            {topThreeMovies.map((movie, index) => (
              <GridItem
                key={index}
                position="relative"
                bg="gray"
                colSpan={index === 0 ? 2 : 1}
                as="a"
                href={`list/${movie.movieId}`}
                overflow="hidden"
                className="group"
              >
                <Image
                  src={
                    movie.photoURL?.endsWith("png") ||
                    movie.photoURL?.endsWith("jpg")
                      ? movie.photoURL
                      : "https://imgur.com/i9PqYju.png"
                  }
                  transition="transform 0.3s ease-in-out"
                  _groupHover={{
                    transform: "scale(1.1)",
                  }}
                  alt={"photo"}
                />
                <Text
                  _groupHover={{}}
                  position="absolute"
                  w="100%"
                  top="50%"
                  left="50%"
                  transform="translate(-50%, -50%)"
                  fontSize="24px"
                  textAlign="center"
                  bg="rgba(222, 181, 34, 0.3)"
                  color="white"
                  zIndex={1}
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
                key={movie.movieId}
                display="flex"
                as="a"
                href={`list/${movie.movieId}`}
                _hover={{ textDecoration: "underline" }}
                role="group"
              >
                <Image
                  w="125px"
                  mr="15px"
                  src={
                    movie.photoURL?.endsWith("png") ||
                    movie.photoURL?.endsWith("jpg")
                      ? movie.photoURL
                      : "https://imgur.com/i9PqYju.png"
                  }
                  transition="transform 0.3s ease-in-out"
                  _groupHover={{
                    transform: "scale(1.1)",
                    // transition: "transform 0.3s ease-in-out",
                  }}
                  alt={"photo"}
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
