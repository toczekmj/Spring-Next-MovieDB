import type { ComponentStyleConfig } from "@chakra-ui/theme";

const Button: ComponentStyleConfig = {
  // The styles all button have in common
  baseStyle: {
    textTransform: "uppercase",
    fontStyle: "Lato",
    width: "125px",
    height: "18px",
    borderRadius: "3xl",
    fontWeight: "700",
    fontSize: "14px",
  },
  variants: {
    white: {
      color: "black",
      background: "white",
      border: "2px",
      borderColor: "white",
      _hover: {
        background: "#2d2e2d",
        color: "white",
      },
    },
    black: {
      color: "white",
      background: "#2d2e2d",
      variant: "outline",
      border: "2px",
      _active: {
        color: "#2d2e2d",
        backgroundColor: "white",
        border: "3px",
      },
      _hover: {
        background: "white",
        color: "#2d2e2d",
      },
      borderColor: "white",
    },
    arrow: {
      w: "10px",
      color: "white",
      borderRadius: "full",
      fontSize: "10px",
      bg: "#2d2e2d",
      border: "2px",
      _hover: {
        background: "#2d2e2d",
        color: "white",
      },
      _active: {
        bg: "white",
        color: "#2d2e2d",
      },
    },
    iconButton: {
      w: "50px",
      h: "50px",
      borderRadius: "xl",
    },
  },
};

export { Button };
