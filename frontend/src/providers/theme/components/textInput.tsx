import type { inputAnatomy as parts } from "@chakra-ui/anatomy";
import type { ComponentStyleConfig } from "@chakra-ui/react";
import type { PartsStyleFunction } from "@chakra-ui/theme-tools";

const variantOutline: PartsStyleFunction<typeof parts> = () => {
  return {
    field: {
      borderColor: "#de1556",
      borderRadius: "4px",
      color: "#de1556",
      padding: "12px",
      placeholder: "text here",
      _placeholder: {
        fontWeight: "400",
        color: "#de1556",
        fontSize: "18px",
      },

      _hover: {
        borderColor: "#de1556",
        color: "black",
        _placeholder: {
          color: "#de1556",
        },
      },
      _readOnly: {
        boxShadow: "none !important",
        userSelect: "all",
      },
      _disabled: {
        opacity: 0.4,
        cursor: "not-allowed",
      },
      _invalid: {
        borderColor: "#D62839",
        boxShadow: `0 0 0 0px #D62839`,
        color: "#D62839",
        _placeholder: {
          color: "#D62839",
        },
        _hover: {
          borderColor: "#D62839",
          color: "#D62839",
          _placeholder: {
            color: "#D62839",
          },
        },
        _focusVisible: {
          zIndex: 1,
          borderColor: "#D62839",
          boxShadow: `0 0 0 0px #D62839`,
          color: "#D62839",
          _placeholder: {
            color: "#D62839",
          },
        },
      },
      _focusVisible: {
        zIndex: 1,
        borderColor: "#de1556",
        boxShadow: `0 0 0 0px #de1556`,
        color: "white",
        _placeholder: {
          color: "#de1556",
        },
      },
    },
    addon: {
      border: "2px solid",
      borderColor: "white",
      bg: "blue",
    },
  };
};

const Input: ComponentStyleConfig = {
  baseStyle: {
    field: {
      width: "100px",
      height: "43px",
      minWidth: 0,
      outline: 0,
      position: "relative",
      appearance: "none",
      transitionProperty: "common",
      transitionDuration: "normal",
      border: "1px solid",
    },
  },

  sizes: {
    lg: {
      fontSize: "18px",
      px: 4,
      h: "43px",
    },
  },

  variants: {
    outline: variantOutline,
  },

  defaultProps: {},
};

export { Input };
