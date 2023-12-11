import { Heading, Stack, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect, useReducer } from "react";

export default function FourOhFour() {
  const { push, asPath } = useRouter();
  const [isShown, toggle] = useReducer(() => true, false);

  useEffect(() => {
    const uuidMatcher = new RegExp(
      /[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}/
    );
    if (uuidMatcher.test(asPath)) {
      void push(asPath);
    } else {
      toggle();
    }
  }, [asPath, push]);

  return (
    <Stack spacing={4} alignItems="center" justifyContent="center" minH="80vh">
      {isShown ? (
        <>
          <Heading>Nie znaleziono strony!</Heading>
          <Text>Strona na którą chciałeś się dostać jeszcze nie istnieje.</Text>
        </>
      ) : null}
    </Stack>
  );
}
