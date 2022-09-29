import { MantineTheme } from "@mantine/core";

export const primaryColor = (theme: MantineTheme) =>
  theme.colors[theme.primaryColor][theme.fn.primaryShade()];

export const secondaryColor = (theme: MantineTheme) =>
  theme.colors.cyan[0];
