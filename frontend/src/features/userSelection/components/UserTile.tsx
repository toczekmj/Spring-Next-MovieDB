import { Button, Flex, Text } from "@chakra-ui/react";
import { useAtom } from "jotai";
import { useRouter } from "next/router";

import { loginAtom } from "@/features/login/atoms/login";

interface UserItemProps {
  name: string;
  roleColor: string;
  role: string;
}

const UserTile = ({ name }: UserItemProps) => {
  const [loginState, setLoginState] = useAtom(loginAtom);
  const router = useRouter();

  const handleClick = () => {
    setLoginState({ ...loginState, name });
    void router.replace("/planner");
  };

  return (
    <Flex
      mr={[25, 35]}
      flexDirection={["row", "column"]}
      w="200px"
      h="265px"
      justify="space-between"
      role="group"
      flexWrap={["wrap", "nowrap"]}
    >
      <Button
        bg="#c4c4c4"
        w="200px"
        h="200px"
        borderRadius="xl"
        mb="5px"
        _groupHover={{ bg: "#fee886" }}
        onClick={handleClick}
      />
      <Flex w="100%" align="center" justify="center" h={[30, 50]}>
        <Text
          fontSize="3xl"
          color="white"
          textTransform="uppercase"
          _groupHover={{ color: "#fee886" }}
        >
          {name}
        </Text>
      </Flex>
    </Flex>
  );
};

export { UserTile };
