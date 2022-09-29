import type { ColorScheme, MantineThemeOverride } from "@mantine/core";

export const theme = (colorScheme: ColorScheme): MantineThemeOverride => ({
  primaryColor: "burgundy",
  primaryShade: 9,
  colors: {
    burgundy: [
      "#f2e6e9",
      "#e6ccd2",
      "#d9b3bc",
      "#cc99a6",
      "#c08090",
      "#b36679",
      "#a64d63",
      "#99334d",
      "#8d1a36",
      "#800020",
    ],
    cyan: ["#008060"],
  },
  fontFamily: "Roboto Slab",
  headings: {
    fontFamily: "Roboto Slab",
  },
  components: {
    Button: {
      styles: {
        root: {
          borderRadius: "5px",
        },
      },
    },
  },
  colorScheme,
});
