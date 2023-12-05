import {
  Button,
  Card,
  CardBody,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  Heading,
  Highlight,
  Stack,
  Table,
  Tag,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useDisclosure,
} from "@chakra-ui/react";
import { addDays, startOfWeek } from "date-fns";
import type { NextPage } from "next";
import Head from "next/head";
import React, { useReducer } from "react";

import { AvailabilityPanel } from "../components/AvailabilityPanel";
import { BottomSection } from "../components/Footer";
import { Header } from "../components/Header";
import { getCredentials } from "../components/utilities/getCredentials";
import { WeekView } from "../components/WeekView";

const getCurrentWorkWeek = () => {
  const days = [startOfWeek(new Date(), { weekStartsOn: 1 })];
  // iterate in for loop and add one day to each day
  for (let i = 1; i < 6; i++) {
    const nextDay = addDays(days[i - 1], 1);
    days.push(nextDay);
  }
  return days;
};

interface AvailabilityColors {
  AVAILABLE: string;
  MAYBE: string;
  UNAVAILABLE: string;
  [key: string]: string; // add index signature
}

const initialState = getCurrentWorkWeek();
export enum Action {
  "NEXT_WEEK" = "NEXT_WEEK",
  "PREVIOUS_WEEK" = "PREVIOUS_WEEK",
  "CURRENT_WEEK" = "CURRENT_WEEK",
  "TODAY" = "TODAY",
}

function reducer(state: Date[], action: { type: Action }) {
  switch (action.type) {
    case Action.PREVIOUS_WEEK:
      return state.map((day) => addDays(day, -7));
    case Action.NEXT_WEEK:
      return state.map((day) => addDays(day, 7));
    case Action.CURRENT_WEEK:
      return initialState;
    default:
      throw new Error();
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const PlannerView: NextPage<{ credentials: any }> = ({ credentials }) => {
  const availabilityColors: AvailabilityColors = {
    AVAILABLE: "green",
    MAYBE: "yellow",
    UNAVAILABLE: "red",
  };

  const { callendar } = getCredentials(credentials);
  const [state, dispatch] = useReducer(reducer, initialState);
  const { isOpen, onOpen, onClose } = useDisclosure();

  // eslint-disable-next-line import/no-named-as-default-member
  //const btnRef = React.useRef();
  return (
    <>
      <Head>
        <title>Obecność - planner </title>
        <meta name="description" content="Callendar app" />
      </Head>
      <Flex h="100vh" direction="column" align="center">
        <Header />
        <AvailabilityPanel />
        <WeekView selectedWeek={state} />
        <Flex h="550px" pt="30px" w="90%" align="center">
          <Flex w="50%" justify="center">
            <Button
              //ref={btnRef}
              variant="white"
              onClick={onOpen}
              w="300px"
            >
              Pokaż wszystkie aktywności
            </Button>
            <Drawer
              isOpen={isOpen}
              placement="right"
              onClose={onClose}
              // finalFocusRef={btnRef}
              size="md"
            >
              <DrawerOverlay />
              <DrawerContent>
                <DrawerCloseButton color="black" />
                <DrawerHeader color="black">Lista aktywności</DrawerHeader>

                <DrawerBody color="black">
                  <Table
                    variant="simple"
                    size="sm"
                    colorScheme="gray"
                    // striped="true"
                  >
                    <Thead>
                      <Tr>
                        <Th>Dostępność</Th>
                        <Th>Dzień</Th>
                        <Th>Od</Th>
                        <Th>Do</Th>
                        <Th>Użytkownik</Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {callendar
                        .sort(
                          (a, b) =>
                            new Date(
                              b.DAY.split(".").reverse().join("-")
                            ).getTime() -
                            new Date(
                              a.DAY.split(".").reverse().join("-")
                            ).getTime()
                        )
                        .map((row, index) => (
                          <Tr key={index}>
                            <Td>
                              <Tag
                                colorScheme={
                                  availabilityColors[row.AVAILABILITY]
                                }
                              >
                                {row.AVAILABILITY}
                              </Tag>
                            </Td>
                            <Td>{row.DAY}</Td>
                            <Td>{row.HOUR_FROM}</Td>
                            <Td>{row.HOUR_TO}</Td>
                            <Td>{row.USER}</Td>
                          </Tr>
                        ))}
                    </Tbody>
                  </Table>
                </DrawerBody>

                <DrawerFooter></DrawerFooter>
              </DrawerContent>
            </Drawer>
          </Flex>

          <Flex w="50%" justify="center" align="center">
            <Card
              direction={{ base: "column", sm: "row" }}
              overflow="hidden"
              variant="outline"
              w="75%"
              mt="15px"
              bg="#2d2e2d"
              borderColor="#2d2e2d"
              h="475px"
            >
              <Stack>
                <CardBody>
                  <Heading fontSize="26px">
                    <Highlight
                      query="Najlepszy czas na spotkanie w ciągu kolejnych 5 dni"
                      styles={{
                        px: "2",
                        py: "1",
                        bg: "#feebc8",
                        color: "#a84a2d",
                      }}
                    >
                      Najlepszy czas na spotkanie w ciągu kolejnych 5 dni
                    </Highlight>
                  </Heading>
                  <Table
                    mt="15px"
                    variant="simple"
                    size="md"
                    bg="#2d2e2d"
                    color="white"
                  >
                    <Thead>
                      <Tr>
                        <Th fontSize="15px">Dzień</Th>
                        <Th fontSize="15px">Możliwe godziny spotkania</Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {/* eslint-disable-next-line @typescript-eslint/no-unsafe-assignment */}
                      {[...Array(5)].map((_, i) => {
                        const date = new Date();
                        date.setDate(date.getDate() + i);
                        const dayString = date
                          .toLocaleDateString("en-GB")
                          .replace(/\//g, ".");
                        if (date.getDay() === 0) {
                          return (
                            <Tr key={i}>
                              <Td>
                                <Tag colorScheme="orange">{dayString}</Tag>
                              </Td>
                              <Td>Jest niedziela! Czas odpocząć.</Td>
                            </Tr>
                          );
                        }
                        const dayAvailability = callendar.filter(
                          (row) => row.DAY === dayString
                        );
                        if (dayAvailability.length === 0) {
                          return (
                            <Tr key={i}>
                              <Td>
                                <Tag colorScheme="orange">{dayString}</Tag>
                              </Td>
                              <Td>Nie podano żadnych danych dla tego dnia.</Td>
                            </Tr>
                          );
                        } else {
                          const availabilityObj: {
                            AVAILABLE: string[];
                            MAYBE: string[];
                            UNAVAILABLE: string[];
                          } = { AVAILABLE: [], MAYBE: [], UNAVAILABLE: [] };
                          dayAvailability.forEach((row) => {
                            const { HOUR_FROM, HOUR_TO, AVAILABILITY } = row;
                            const hours = `${HOUR_FROM}-${HOUR_TO}`;
                            availabilityObj[
                              AVAILABILITY as keyof typeof availabilityObj
                            ].push(hours);
                          });

                          const availableHours =
                            availabilityObj.AVAILABLE.reduce(
                              (acc: number[], hours: string) => {
                                const [from, to] = hours.split("-");
                                for (
                                  let i = parseInt(from);
                                  i < parseInt(to);
                                  i++
                                ) {
                                  acc.push(i);
                                }
                                return acc;
                              },
                              []
                            );

                          const maybeHours = availabilityObj.MAYBE.reduce(
                            (acc: number[], hours: string) => {
                              const [from, to] = hours.split("-");
                              for (
                                let i = parseInt(from);
                                i < parseInt(to);
                                i++
                              ) {
                                if (availableHours.includes(i)) {
                                  acc.push(i);
                                }
                              }
                              return acc;
                            },
                            []
                          );

                          const unavailableHours =
                            availabilityObj.UNAVAILABLE.reduce(
                              (acc: number[], hours: string) => {
                                const [from, to] = hours.split("-");
                                for (
                                  let i = parseInt(from);
                                  i < parseInt(to);
                                  i++
                                ) {
                                  acc.push(i);
                                }
                                return acc;
                              },
                              []
                            );

                          // const hourAvailability: Record<number, string[]> = {};
                          // availabilityObj.AVAILABLE.forEach((hours) => {
                          //   const [from, to] = hours.split("-");
                          //   for (
                          //     let i = parseInt(from);
                          //     i < parseInt(to);
                          //     i++
                          //   ) {
                          //     if (!hourAvailability[i]) {
                          //       hourAvailability[i] = [];
                          //     }
                          //     hourAvailability[i].push(hours);
                          //   }
                          // });

                          // // generate the meetingHours variable based on the hourAvailability mapping
                          // const meetingHours = Object.keys(hourAvailability)
                          //   .filter((hour) => {
                          //     const users = hourAvailability[parseInt(hour)];
                          //     return users.every((user) => {
                          //       const [from, to] = user.split("-");
                          //       for (
                          //         let i = parseInt(from);
                          //         i < parseInt(to);
                          //         i++
                          //       ) {
                          //         if (!availableHours.includes(i)) {
                          //           return false;
                          //         }
                          //       }
                          //       return true;
                          //     });
                          //   })
                          //   .sort()
                          //   .map(
                          //     (hour) => `${hour}:00-${parseInt(hour) + 1}:00`
                          //   );

                          const meetingHours = availableHours
                            .filter(
                              (hour: number) =>
                                !maybeHours.includes(hour) &&
                                !unavailableHours.includes(hour)
                            )
                            .sort()
                            .reduce((acc: string[], hour: number) => {
                              const hourString = `${hour}:00-${hour + 1}:00`;
                              if (!acc.includes(hourString)) {
                                acc.push(hourString);
                              }
                              return acc;
                            }, []);

                          return (
                            <Tr key={i}>
                              <Td>
                                <Tag colorScheme="orange">{dayString}</Tag>
                              </Td>
                              {meetingHours.length === 0 ? (
                                <Td>Spotkanie nie jest możliwe tego dnia.</Td>
                              ) : (
                                <Td>{meetingHours.join(", ")}</Td>
                              )}
                            </Tr>
                          );
                        }
                      })}
                    </Tbody>
                  </Table>
                </CardBody>
              </Stack>
            </Card>
          </Flex>
        </Flex>
        <BottomSection selectedWeek={state} dispatch={dispatch} />
      </Flex>
    </>
  );
};

export { PlannerView };
