import {
  Button,
  Card,
  Center,
  Divider,
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
import { MovieData } from "@/providers/interfaces/movieDataTypes";
import { fetcher } from "@/providers/api/fetchers";
import { useAtomValue } from "jotai";
import { loginAtom } from "@/features/navbar/atoms/loginAtom";

export default function SingleListMovie() {
  const router = useRouter();
  const isLoggedIn = useAtomValue(loginAtom);

  const APIURL = `https://www.projektimdb.it/api/v1/movies`;

  const { data, error } = useSWR<MovieData[]>(APIURL, fetcher);
  console.log(data);
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
      <Heading alignSelf="center">Przeglądaj wszystkie dostępne filmy</Heading>
      <Divider w="90%" alignSelf="center" mb="24px" />
      <Stack maxH="90vh" align="center" overflowY="auto" spacing={5}>
        {data.map((movie) => (
          <Card
            _hover={{ bg: "#342a08", color: "white" }}
            key={movie.movieId}
            as="a"
            href={`/list/${movie.movieId}`}
            w="50%"
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
      </Stack>
    </Stack>
  );
}
// export const TagsDisplay = ({ tags }: { tags: string[] }) => {
//     const [isExpanded, setExpanded] = useBoolean(false);

//     // Maximum number of tags in the first line
//     const breakpoint = 2;
//     const leadingTags = tags.slice(0, breakpoint);
//     const remainingTags = tags.slice(breakpoint);

//     const gap = "4px";

//     return (
//       <Flex justifyContent="space-between" alignItems="center" gap="8px">
//         <Text as="span" display="inline-block" py="9px">
//           <Flex gap={gap}>
//             <TagsList tags={leadingTags} />
//           </Flex>
//           <AnimatePresence>
//             {remainingTags.length > 0 && isExpanded ? (
//               <AnimatedFlex
//                 flexWrap="wrap"
//                 gap={gap}
//                 marginTop={gap}
//                 overflowY="hidden"
//                 {...animationProps}
//               >
//                 <TagsList tags={remainingTags} />
//               </AnimatedFlex>
//             ) : null}
//           </AnimatePresence>
//         </Text>

//         {tags.length > breakpoint ? (
//           <IconButton
//             aria-label="Pokaż więcej"
//             color="midnightBlue.900"
//             icon={
//               <ChevronDown transform={isExpanded ? "rotate(180)" : undefined} />
//             }
//             onClick={setExpanded.toggle}
//             variant="iconUnstyled"
//             size="xs"
//           />
//         ) : null}
//       </Flex>
//     );
//   };
