/* eslint-disable @typescript-eslint/no-unsafe-call */
import {
  Button,
  Center,
  Flex,
  Input,
  InputGroup,
  InputRightElement,
  useToast,
} from "@chakra-ui/react";
import { useAtom } from "jotai";
import { useRouter } from "next/router";
import { useState } from "react";

import { loginAtom } from "../atoms/login";

function LoginForm({
  credentials,
}: {
  credentials: { login: string; password: string };
}) {
  const [loginState, setLoginState] = useAtom(loginAtom);
  const [show, setShow] = useState(false);
  const router = useRouter();
  const handleClick = () => setShow(!show);
  const toast = useToast();
  const ToastId = "test-toast";
  const handleSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();
    const target = event.target as typeof event.target & {
      login: { value: string };
      password: { value: string };
    };
    if (
      target.login.value === credentials.login &&
      target.password.value === credentials.password
    ) {
      // for later use
      //credentials.login && credentials.password
      // authenticate user
      setLoginState({ ...loginState, authenticated: true });

      void router.replace("/user-selection");
    } else {
      if (!toast.isActive(ToastId)) {
        toast({
          id: ToastId,
          title: "Złe dane logowania.",
          description: "Użyłeś złego hasła lub loginu. Spróbuj ponownie.",
          status: "error",
          duration: 2000,
          isClosable: true,
          position: "bottom-right",
        });
      }
    }
  };

  return (
    <Flex flexDirection="column" minW={[300, 350, 350]}>
      <form onSubmit={handleSubmit}>
        <InputGroup mb="35px" role="group">
          <Input
            w="100%"
            name="login"
            h="65px"
            color="white"
            placeholder="LOGIN"
            _groupHover={{
              background: "white",
              color: "#de1556",
            }}
            _placeholder={{
              fontWeight: "850",
              pl: [100, 100, 115],
              pt: "9px",
              letterSpacing: "1px",
              color: "white",
              fontSize: "19px",
              fontStyle: "italic",
              _groupHover: { color: "#de1556" },
            }}
            border="4px"
            borderRadius="2xl"
            focusBorderColor="white"
          />
        </InputGroup>

        <InputGroup size="md" mb={[51, 51, 61]} role="group">
          <Input
            w="100%"
            h="65px"
            name="password"
            border="4px"
            type={show ? "text" : "password"}
            color="white"
            placeholder="HASŁO"
            _groupHover={{
              background: "white",
              color: "#2d2e2d",
            }}
            _placeholder={{
              fontWeight: "850",
              pl: [100, 100, 115],
              pt: "9px",
              letterSpacing: "1px",
              color: "white",
              fontSize: "19px",
              fontStyle: "italic",
              _groupHover: { color: "#de1556" },
            }}
            borderRadius="2xl"
            focusBorderColor="white"
          />
          <InputRightElement width="90px" height="66px" mr="5px">
            <Button
              size="sm"
              onClick={handleClick}
              variant="outline"
              color="white"
              border="none"
              colorScheme="none"
              outlineColor="none"
              _groupHover={{ color: "#9D9D9D" }}
            >
              {show ? "Ukryj" : "Pokaż"}
            </Button>
          </InputRightElement>
        </InputGroup>

        <Button
          w="50px"
          h="50px"
          color="#f8dd8a"
          background="#2d2e2d"
          borderRadius="full"
          fontWeight="700"
          ml={[125, 150, 150]}
          type="submit"
          letterSpacing="13px"
          fontSize="22px"
          border="4px"
          borderColor="#f8dd8a"
          _hover={{
            background: "#de1556",
            color: "white",
            borderColor: "white",
          }}
        >
          <Center ml="11px">➔</Center>
        </Button>
      </form>
    </Flex>
  );
}

export { LoginForm };
