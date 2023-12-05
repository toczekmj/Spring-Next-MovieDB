import { CheckIcon, CloseIcon, QuestionIcon } from "@chakra-ui/icons";
import {
  Flex,
  HStack,
  IconButton,
  NumberInput,
  NumberInputField,
  Text,
  Tooltip,
  useToast,
} from "@chakra-ui/react";
import { useAtom } from "jotai";
import { useState } from "react";

import { loginAtom } from "@/features/login/atoms/login";

import { selectedDayAtom } from "../atoms/selectedDay";

const iconButtons = [
  {
    key: "AVAILABLE",
    label: "Dostępny",
    variant: "iconButton",
    colorScheme: "green",
    icon: <CheckIcon color="black" />,
  },
  {
    key: "MAYBE",
    label: "Może",
    variant: "iconButton",
    colorScheme: "yellow",
    icon: <QuestionIcon color="black" />,
  },
  {
    key: "UNAVAILABLE",
    label: "Niedostępny",
    variant: "iconButton",
    colorScheme: "red",
    icon: <CloseIcon color="black" />,
  },
];

const AvailabilityPanel = () => {
  const [selectedDay] = useAtom(selectedDayAtom);
  const [loginState] = useAtom(loginAtom);
  const [state, setState] = useState({
    HOUR_FROM: 8,
    HOUR_TO: 22,
  });

  const dateOptions = {
    timeZone: "Europe/Zurich",
    month: "numeric" as const,
    day: "numeric" as const,
    year: "numeric" as const,
  };

  const dateFormatter = new Intl.DateTimeFormat("pl-PL", dateOptions);
  const dateAsFormattedString = dateFormatter.format(new Date(selectedDay));
  const isoDate = dateAsFormattedString;
  //const changeToISODate = new Date(dateAsFormattedString);
  //const iso = changeToISODate.toISOString();
  //DateAsFormattedString.toISOString()
  function handleChange({ name, value }: { name: string; value: string }) {
    setState({
      ...state,
      [name]: Number(value),
    });
  }
  const toast = useToast();
  const handleClick = async (availability: string, color: string) => {
    if (state.HOUR_FROM < state.HOUR_TO) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const res = await fetch("http://localhost:3000/api/makecallendar", {
        method: "POST",
        body: JSON.stringify({
          DAY: isoDate,
          HOUR_FROM: state.HOUR_FROM.toString(),
          HOUR_TO: state.HOUR_TO.toString(),

          AVAILABILITY: {
            name: availability,
            color: color,
          },

          USER: loginState?.name,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      let availabilityState;
      switch (availability) {
        case "AVAILABLE":
          availabilityState = "jesteś dostępny";
          break;
        case "MAYBE":
          availabilityState = "może będziesz dostępny";
          break;
        case "UNAVAILABLE":
          availabilityState = "nie będziesz dostępny";
          break;
        default:
          availabilityState = "nieznany status dostępności";
      }
      toast({
        title: "Udało się wysłać zapytanie",
        description: `Zadeklarowałeś, że ${availabilityState} w dniu ${isoDate}, między ${state.HOUR_FROM.toString()} a ${state.HOUR_TO.toString()}.`,
        status: "success",
        position: "bottom-right",
        duration: 5000,
        isClosable: true,
      });
    } else {
      toast({
        title: "Nie udało się wysłać zapytania",
        description: "Wprowadziłeś złe dane! Spróbuj ponownie.",
        status: "error",
        position: "bottom-right",
        duration: 5000,
        isClosable: true,
      });
      // throw new Error("HOUR_FROM > HOUR_TO");
    }
  };

  return (
    <Flex color="white" w="100%" direction="column" alignItems="center">
      <HStack gap={20} align="center" h="100px" pl={10}>
        <Text fontSize="xl">Dyspozycyjność</Text>
        <Flex align="center" justify="space-between" w="450px">
          <Flex align="center">
            <Text fontWeight="600" mr={6}>
              od
            </Text>
            <NumberInput
              w="150px"
              color="black"
              borderRadius="xl"
              h="45px"
              bg="white"
              name="HOUR_FROM"
              min={8}
              max={21}
              value={state.HOUR_FROM}
              onChange={(value) => handleChange({ name: "HOUR_FROM", value })}
            >
              <NumberInputField
                placeholder="8"
                _placeholder={{
                  fontStyle: "italic",
                }}
                color="black"
                borderRadius="xl"
                h="45px"
              />
            </NumberInput>
          </Flex>
          <Flex align="center">
            <Text fontWeight="600" mr={6}>
              do
            </Text>
            <NumberInput
              w="150px"
              color="black"
              borderRadius="xl"
              h="45px"
              bg="white"
              name="HOUR_TO"
              min={9}
              max={22}
              value={state.HOUR_TO}
              onChange={(value) => handleChange({ name: "HOUR_TO", value })}
            >
              <NumberInputField
                placeholder="22"
                _placeholder={{
                  fontStyle: "italic",
                }}
                color="black"
                borderRadius="xl"
                h="45px"
              />
            </NumberInput>
          </Flex>
        </Flex>
        <HStack gap={4}>
          {iconButtons.map((iconButton) => (
            <Tooltip
              key={iconButton.key}
              label={iconButton.key}
              bg="white"
              color="black"
              placement="top"
              openDelay={500}
            >
              <IconButton
                key={iconButton.key}
                aria-label={iconButton.label}
                colorScheme={iconButton.colorScheme}
                icon={iconButton.icon}
                onClick={() => {
                  void handleClick(iconButton.key, iconButton.colorScheme);
                }}
                w="50px"
                h="50px"
                borderRadius="xl"
              />
            </Tooltip>
          ))}
        </HStack>
      </HStack>
    </Flex>
  );
};

export { AvailabilityPanel };
