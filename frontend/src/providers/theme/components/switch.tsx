import type { ComponentStyleConfig } from "@chakra-ui/theme";
import type { SystemStyleObject } from "@chakra-ui/theme-tools";
import { calc, cssVar } from "@chakra-ui/theme-tools";

const $diff = cssVar("switch-track-diff");
const $width = cssVar("switch-track-width");
const $height = cssVar("switch-track-height");

const diffValue = calc.subtract($width, $height);

const $translateX = cssVar("switch-thumb-x");

const baseStyleTrack: SystemStyleObject = {
  borderRadius: "full",
  p: "0px",
  width: "36px",
  height: "16px",
  transitionProperty: "common",
  transitionDuration: "fast",

  _focus: { boxShadow: "none" },
  _disabled: {
    opacity: 0.4,
    cursor: "not-allowed",
  },
};

const firmowidStyleThumb: SystemStyleObject = {
  baseStyle: {
    transitionProperty: "transform",
    transitionDuration: "normal",
    borderRadius: "inherit",
    borderWidth: "1px",
    mt: "-2px",
    width: "20px",
    height: "20px",
    _checked: {
      transform: `translateX(17px)`,
    },
  },
};

const Switch: ComponentStyleConfig = {
  baseStyle: {
    container: {
      [$diff.variable]: diffValue,
      [$translateX.variable]: $diff.reference,
      _rtl: {
        [$translateX.variable]: calc($diff).negate().toString(),
      },
    },
    track: baseStyleTrack,
    thumb: firmowidStyleThumb.baseStyle,
  },

  sizes: {},

  variants: {
    blue: {
      track: { bg: "#9A9CCE", _checked: { bg: "#9A9CCE" } },
      thumb: { bg: "#373595", borderColor: "#373595" },
    },
    white: {
      track: { bg: "#BDC7DA", _checked: { bg: "#BDC7DA" } },
      thumb: { bg: "#FFFFFF", borderColor: "#BDC7DA" },
    },
    blueBorder: {
      track: { bg: "#BDC7DA", _checked: { bg: "#BDC7DA" } },
      thumb: { bg: "#FFFFFF", borderColor: "#204480" },
    },

    defaultProps: {},
  },
};

export { Switch };
