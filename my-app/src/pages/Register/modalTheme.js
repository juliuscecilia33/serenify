import { modalAnatomy as parts } from "@chakra-ui/anatomy";
import { createMultiStyleConfigHelpers } from "@chakra-ui/styled-system";

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(parts.keys);

const baseStyle = definePartsStyle({
  // define the part you're going to style
  overlay: {
    bg: "#ece8d1", //change the background
  },
  dialog: {
    borderRadius: "unstyle",
    bg: `#ece8d1`,
  },
});

export const modalTheme = defineMultiStyleConfig({
  baseStyle,
});
