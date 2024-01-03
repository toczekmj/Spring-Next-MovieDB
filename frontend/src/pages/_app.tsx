import { useAtom } from "jotai";
import type { AppProps } from "next/app";

//import { useRouter } from "next/router";

import { ChakraProvider } from "@/providers/theme/chakra";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default MyApp;
