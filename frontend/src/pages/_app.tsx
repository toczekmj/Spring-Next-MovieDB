import { useAtom } from "jotai";
import type { AppProps } from "next/app";

//import { useRouter } from "next/router";
import { loginAtom } from "@/features/login/atoms/login";
import { ProtectedView } from "@/features/login/pages/ProtectedView";
import RequireNameView from "@/features/login/pages/RequireNameView";
import { ChakraProvider } from "@/providers/theme/chakra";

function MyApp({ Component, pageProps }: AppProps) {
  const [loginState] = useAtom(loginAtom);
  //const router = useRouter();

  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  if (pageProps.protected && !loginState.authenticated) {
    return (
      <ChakraProvider>
        <ProtectedView />
      </ChakraProvider>
    );
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  if (pageProps.protected && pageProps.userMustBeSelected && !loginState.name) {
    return (
      <ChakraProvider>
        <RequireNameView />
      </ChakraProvider>
    );
  }

  // if (loginState.authenticated && router.pathname === "/") {
  //   void router.replace("/planner");
  // }

  return (
    <ChakraProvider>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default MyApp;
