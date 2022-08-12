import { Container, ContainerProps } from "@mantine/core";
import * as React from "react";
import { FunctionComponent } from "react";

interface HeroContainerProps extends ContainerProps {}

export const HeroContainer: FunctionComponent<HeroContainerProps> = ({
  children,
  ...rest
}) => (
  <Container
    {...rest}
    size="xs"
    px="xs"
    sx={{
      display: "flex",
      flexDirection: "column",
      height: 300,
      justifyContent: "space-around",
    }}
  >
    {children}
  </Container>
);
