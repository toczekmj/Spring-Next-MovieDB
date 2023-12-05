import { Button, Center, Flex } from "@chakra-ui/react";
import { format } from "date-fns";
import type { Dispatch } from "react";

import { Action } from "../pages/PlannerView";

interface BottomSectionProps {
  selectedWeek: Date[];
  dispatch: Dispatch<{ type: Action }>;
}

const BottomSection = ({ selectedWeek, dispatch }: BottomSectionProps) => {
  // We can get selectedWeek[5], because the array is always of length 6
  const weekLabel = `${format(selectedWeek[0], "dd.MM")} - ${format(
    selectedWeek[5],
    "dd.MM"
  )}`;

  return (
    <Flex
      justify="space-between"
      //bg="red"
      mt="30px"
      align="center"
      w={["50%", "80%", "90%"]}
    >
      <Button
        variant="black"
        onClick={() => dispatch({ type: Action.CURRENT_WEEK })}
      >
        Ten tydzień
      </Button>
      <Flex w={[200, 250, 350]} justify="space-between" align="center">
        <Button
          variant="arrow"
          onClick={() => {
            dispatch({ type: Action.PREVIOUS_WEEK });
          }}
        >
          ⟵
        </Button>
        <Center
          bg="white"
          fontSize="16px"
          fontWeight="750"
          borderRadius="2xl"
          color="black"
          w={[50, 100, 220]}
          p={3}
        >
          {weekLabel}
        </Center>
        <Button
          variant="arrow"
          onClick={() => {
            dispatch({ type: Action.NEXT_WEEK });
          }}
        >
          ⟶
        </Button>
      </Flex>
      <Button variant="black" visibility="hidden">
        ZAPISZ
      </Button>
    </Flex>
  );
};

export { BottomSection };
