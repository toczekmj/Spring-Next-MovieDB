import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormLabel,
  HStack,
  Input,
  InputGroup,
  InputRightElement,
  Link,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";
import { loginAtom } from "./atoms/loginAtom";
import { useAtom } from "jotai";

export const SignInModal = ({
  isOpen,
  onClose,
  onClick,
}: {
  isOpen: boolean;
  onClose: () => void;
  onClick: () => void;
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered={true} size="sm">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Zarejestruj się</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Stack spacing={4}>
            <HStack>
              <Box>
                <FormControl id="firstName" isRequired>
                  <FormLabel>Imię</FormLabel>
                  <Input type="text" />
                </FormControl>
              </Box>
              <Box>
                <FormControl id="lastName" isRequired>
                  <FormLabel>Nazwisko</FormLabel>
                  <Input type="text" />
                </FormControl>
              </Box>
            </HStack>
            <FormControl id="email" isRequired>
              <FormLabel>Email</FormLabel>
              <Input type="email" />
            </FormControl>
            <FormControl id="password" isRequired>
              <FormLabel>Hasło</FormLabel>
              <InputGroup>
                <Input type={showPassword ? "text" : "password"} />
                <InputRightElement h={"full"}>
                  <Button
                    variant={"ghost"}
                    onClick={() =>
                      setShowPassword((showPassword) => !showPassword)
                    }
                  >
                    {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>
            <Stack spacing={10} pt={2}>
              <Button
                loadingText="Submitting"
                size="lg"
                bg={"#deb522"}
                color={"white"}
                _hover={{
                  bg: "white",
                  color: "#342a08",
                }}
              >
                Zarejestruj się{" "}
              </Button>
            </Stack>
            <Stack pt={6}>
              <Text align={"center"}>
                Masz juz konto?
                <Button
                  color={"blue.400"}
                  onClick={onClick}
                  _hover={{
                    textDecoration: "underline",
                  }}
                >
                  Zaloguj
                </Button>
              </Text>
            </Stack>
          </Stack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export const LoginModal = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const [loginValue, setLoginValue] = useAtom(loginAtom);

  const toggleValue = () => {
    setLoginValue((prevValue) => !prevValue);
  };
  const [showPassword, setShowPassword] = useState(false);
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered={true} size="sm">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Zaloguj się</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Stack spacing={8} mx={"auto"} maxW={"lg"} py={6} px={6}>
            <Stack spacing={4}>
              <FormControl id="email">
                <FormLabel>Email</FormLabel>
                <Input
                  type="email"
                  value={"Patrick Bateman"}
                  isReadOnly={true}
                />
              </FormControl>
              <FormControl id="password">
                <FormLabel>Hasło</FormLabel>
                <InputGroup>
                  <Input
                    type={showPassword ? "text" : "password"}
                    isReadOnly={true}
                    value={"haslo123"}
                  />
                  <InputRightElement h={"full"}>
                    <Button
                      variant={"ghost"}
                      onClick={() =>
                        setShowPassword((showPassword) => !showPassword)
                      }
                    >
                      {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              <Stack spacing={10}>
                <Stack align={"start"} justify={"space-between"}>
                  <Checkbox isChecked colorScheme="yellow">
                    Zapamiętaj mnie
                  </Checkbox>
                  <Link color={"#342a08"} as="a">
                    Zapomniałeś hasła?
                  </Link>
                </Stack>
                <Button
                  bg={"#deb522"}
                  color={"white"}
                  _hover={{
                    bg: "white",
                    color: "#342a08",
                  }}
                  onClick={() => {
                    toggleValue();
                    onClose();
                  }}
                >
                  Zaloguj
                </Button>
              </Stack>
            </Stack>
          </Stack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
