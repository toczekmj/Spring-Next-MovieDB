import { Button, Center, Flex, Text, VStack } from "@chakra-ui/react";
import { useRouter } from "next/router";

const RequireNameView = () => {
  const router = useRouter();
  const toUserSelection = () => {
    void router.replace("/user-selection");
  };

  return (
    <Flex h="100vh" direction="column" align="center" justify="center">
      <VStack w="100%" alignSelf="center" align="center" justify="center">
        <Text
          fontWeight="850"
          fontSize={[30, 50]}
          color="white"
          letterSpacing={[3, 8]}
          align="center"
        >
          Nie masz dostępu do tej strony!
        </Text>
        <Center mt={45} fontSize={[20, 30]} letterSpacing={[3, 5]} px={5}>
          Aby przejść dalej musisz wybrać użytkownika
        </Center>
      </VStack>

      <Flex px={25} py={25}>
        <Flex>
          <Text fontSize={50} mr="15px" mt="20px">
            ↳
          </Text>
        </Flex>
        <Flex
          flexDirection="column"
          w="150px"
          h="150px"
          align="center"
          mt="10px"
        >
          <Button
            bg="#c4c4c4"
            w="100px"
            h="100px"
            borderRadius="xl"
            mb="5px"
            _hover={{ bg: "white" }}
            onClick={toUserSelection}
          />
          <Flex w="200px" align="center" justify="center" h="50px">
            <Text fontSize="20" color="white" textTransform="uppercase">
              Powrót
            </Text>
          </Flex>
        </Flex>
        <Flex>
          <Text fontSize={50} ml="15px" mt="20px">
            ↲
          </Text>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default RequireNameView;
