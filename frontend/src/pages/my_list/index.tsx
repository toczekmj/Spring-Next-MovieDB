import { loginAtom } from "@/features/navbar/atoms/loginAtom";
import { Stack, Text } from "@chakra-ui/react";
import { useAtomValue } from "jotai";

const MyList = () => {
  const isLoggedIn = useAtomValue(loginAtom);
  return !isLoggedIn ? (
    <Stack justify="center" align="center" h="80vh">
      <Text>
        Nie masz dostępu do tej strony, zaloguj się, aby móc z niej skorzystać.
      </Text>
    </Stack>
  ) : (
    <Stack>
      <Text>Listy</Text>
    </Stack>
  );
};

export default MyList;
