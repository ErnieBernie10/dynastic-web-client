import * as React from "react";
import { FunctionComponent } from "react";
import { Box, Button, ButtonProps, Text } from "@mantine/core";
import { PolymorphicComponentProps } from "@mantine/utils";

type InfoButtonProps<C = "button"> = PolymorphicComponentProps<
  C,
  ButtonProps
> & {
  width: number | string;
  label: string;
  description: string;
};

export const InfoButton: FunctionComponent<InfoButtonProps> = ({
  width,
  label,
  description,
  ...rest
}) => (
  <Button
    {...rest}
    sx={{
      height: "100%",
      ...rest.sx,
    }}
  >
    <Box
      sx={{
        width,
        margin: "8px 0",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Text>{label}</Text>
      <Text color="dimmed" sx={{ display: "inline", whiteSpace: "normal" }}>
        {description}
      </Text>
    </Box>
  </Button>
);
