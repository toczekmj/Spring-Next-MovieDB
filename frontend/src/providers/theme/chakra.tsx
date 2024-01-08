import "@fontsource/lato";

import { ChakraProvider as Provider, extendTheme } from "@chakra-ui/react";

import Footer from "@/features/footer/Footer";
import { WithSubnavigation } from "@/features/navbar/Navbar";
import { Button } from "@/providers/theme/components/button";

import { Input } from "./components/textInput";

const theme = extendTheme({
  config: {
    initialColorMode: "light",
    useSystemColorMode: false,
  },

  fonts: {
    body: "Lato, sans-serif, Montserrat, Arial",
    heading: "Lato, sans-serif, Montserrat, Arial",
    mono: "Lato, Montserrat, Arial, monospace",
    logo: "Ubuntu, Arial",
  },
  colors: {
    gray: "#d9d9d9",
  },
  components: {
    // Button,
    // Switch,
    // Input,
  },
});

const ChakraProvider = ({ children }: { children: JSX.Element }) => {
  return (
    <Provider theme={theme}>
      <WithSubnavigation />
      {children}
      <Footer />
    </Provider>
  );
};

export { ChakraProvider };
