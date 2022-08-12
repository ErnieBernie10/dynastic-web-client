import type { ColorScheme, MantineThemeOverride } from "@mantine/core";

export const theme = (colorScheme: ColorScheme): MantineThemeOverride => ({
  primaryColor: "teal",
  primaryShade: 8,
  fontFamily: "Roboto Slab",
  headings: {
    fontFamily: "Roboto Slab",
  },
  colorScheme,
});
