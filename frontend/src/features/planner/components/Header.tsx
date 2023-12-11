/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
  Avatar,
  Button,
  Flex,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Tooltip,
} from "@chakra-ui/react";
import { useAtom } from "jotai";
import { RESET } from "jotai/utils";
import { useRouter } from "next/router";

import { loginAtom } from "@/features/login/atoms/login";

const Info = () => {
  return (
    <Popover>
      <PopoverTrigger>
        <Button variant="black" w="200px">
          Info
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <PopoverArrow />
        <PopoverCloseButton />
        <PopoverHeader color="black">INFO</PopoverHeader>
        <PopoverBody color="black">
          Wybierz godziny (8-22) <p>w których jesteś </p> <p> a) Dostępny </p>
          <p> b) Nie wiesz </p>
          <p> c) Niedostępny </p>
          <p> oraz wybierz dzień</p>
          <p>
            Następnie poczekaj, aż program wyliczy kiedy jest najlepsza pora na
            spotkanie!
          </p>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};

const Header = () => {
  const [loginState, setLoginState] = useAtom(loginAtom);
  const router = useRouter();

  const logout = () => {
    void router.replace("/");
    setLoginState(RESET);
  };
  return (
    <Flex
      w="90%"
      borderBottomWidth={1}
      pb="5px"
      pt="105px"
      //bg="red"
      align="flex-end"
      justify="space-between"
    >
      <Info />
      <Flex align="flex-end">
        <Tooltip
          label={loginState?.name}
          bg="white"
          color="black"
          placement="top"
        >
          <Avatar
            mr="10px"
            w="40px"
            h="40px"
            name={loginState?.name ?? "Niewiadomo"}
            color="black"
            border="2px"
            bg="white"
          />
        </Tooltip>
        <Button variant="black" onClick={logout}>
          WYLOGUJ
        </Button>
      </Flex>
    </Flex>
  );
};

export { Header };
