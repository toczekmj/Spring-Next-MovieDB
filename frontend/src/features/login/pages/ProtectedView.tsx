import { Button, Center, Flex, Text, VStack } from "@chakra-ui/react";
import { useRouter } from "next/router";

const ProtectedView = () => {
  const router = useRouter();
  const toLoginForm = () => {
    void router.replace("/");
  };

  return (
    <Flex h="100vh" direction="column" align="center" justify="center">
      <VStack
        w="100%"
        alignSelf="center"
        align="center"
        justify="center"
        px={[10, 0]}
      >
        <Text
          fontWeight="850"
          fontSize={[30, 35, 50]}
          color="white"
          letterSpacing={[3, 3, 8]}
          align="center"
        >
          Nie masz dostępu do tej strony!
        </Text>
        <Center
          mt={45}
          fontSize={[20, 25, 30]}
          letterSpacing={[3, 3, 5]}
          px={5}
        >
          Zaloguj się klikając poniższy przycisk
        </Center>
      </VStack>

      <Flex px={25} py={25} maxW={[350, 1000, "full"]}>
        <Text fontSize={50} mr="25px">
          ↳
        </Text>
        <Button
          mt="20px"
          w="250px"
          h="45px"
          bg="white"
          color="black"
          borderRadius="2xl"
          fontWeight="700"
          letterSpacing="6px"
          fontSize="18px"
          onClick={toLoginForm}
          _hover={{
            background: "#2d2e2d",
            color: "white",
          }}
        >
          ZALOGUJ
        </Button>
        <Text fontSize={50} ml="25px">
          ↲
        </Text>
      </Flex>
    </Flex>
  );
};

export { ProtectedView };
