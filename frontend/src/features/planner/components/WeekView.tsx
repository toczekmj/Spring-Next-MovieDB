/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
// somehow date-fns imports are considered the same
/* eslint-disable import/no-duplicates */
import { Box, Flex, SimpleGrid, Text, VStack } from "@chakra-ui/react";
import { format, isSameDay } from "date-fns";
import { pl } from "date-fns/locale";
import { useAtom } from "jotai";

import { selectedDayAtom } from "../atoms/selectedDay";

//const DAY_ITEM_HEIGHT = 600;
interface WeekViewProps {
  selectedWeek: Date[];
}

const DayItem = ({ day }: { day: Date }) => {
  const [selectedDay, setSelectedDay] = useAtom(selectedDayAtom);
  //const hours = [8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22];
  //const hourHeight = (DAY_ITEM_HEIGHT - 1) / hours.length;
  let backgroundImage = "";
  switch (format(day, "EEE")) {
    case "Mon":
      backgroundImage = "/monday.png";
      break;
    case "Tue":
      backgroundImage = "/tuesday.png";
      break;
    case "Wed":
      backgroundImage = "/wednesday.png";
      break;
    case "Thu":
      backgroundImage = "/thursday.png";
      break;
    case "Fri":
      backgroundImage = "/friday.png";
      break;
    case "Sat":
      backgroundImage = "/saturday.png";
      break;
    default:
      backgroundImage = "/monday.png";
      break;
  }

  return (
    <VStack w="100%" mx={20} px={1}>
      <Flex w="100%" justify="space-between" align="center" px={2}>
        <Text> {format(day, "EEE", { locale: pl }).toUpperCase()}</Text>
        <Text>{format(day, "dd.MM")}</Text>
      </Flex>
      <Box
        as="button"
        // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
        backgroundImage={`url('${backgroundImage}')`}
        // bg={
        //   isSameDay(day, selectedDay) ? (
        //     <Image src="./images/tuesday.png" alt="day" />
        //   ) : (
        //     <Image src="./images/tuesday.png" alt="day" />
        //   )
        // }
        height="50px"
        //{DAY_ITEM_HEIGHT}
        w="100%"
        borderRadius={8}
        borderWidth={isSameDay(day, selectedDay) ? 5 : 0}
        borderColor={isSameDay(day, selectedDay) ? "yellow.300" : "gray.300"}
        position="relative"
        _hover={{ shadow: "3xl", opacity: 0.7 }}
        onClick={() => setSelectedDay(day)}
      >
        {/* {hours.map((hour, index) => (
          <Box
            width="100%"
            //     bg="red"
            left={0}
            height={hourHeight}
            //  borderWidth={1}
            color="black"
            key={hour}
            position="absolute"
            top={index * hourHeight}
          >
            {/* <Text key={hour}>{hour}:00</Text> */}
        {/* </Box>
        ))} */}
      </Box>
    </VStack>
  );
};
//: NextPage<{ callendar: any }> = ({ callendar })
//({ selectedWeek }: WeekViewProps)
export const WeekView = ({ selectedWeek }: WeekViewProps) => {
  //const { callendar } = getCredentials(callendarDatabaseId);
  return (
    <VStack gap={1} w="100%">
      <SimpleGrid columns={6} w="90%" gap={2} alignSelf="flex-start">
        {selectedWeek.map((day: Date) => (
          <DayItem day={day} key={day.getTime()} />
        ))}
      </SimpleGrid>
    </VStack>
  );
};
