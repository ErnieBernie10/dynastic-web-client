import * as React from "react";
import { FunctionComponent, PropsWithChildren } from "react";
import { Center, Container } from "@mantine/core";
import { Shell, TopNavbarLink } from "@ui/common";

interface MainLayoutProps {}

export const MainLayout: FunctionComponent<
  PropsWithChildren<MainLayoutProps>
> = ({ children }) => (
  <Shell
    headerSection={
      <Center>
        <TopNavbarLink label="Dynasty" to="/dynasty" />
      </Center>
    }
  >
    <main style={{ height: "100%" }}>
      <Container
        size="lg"
        px="xs"
        mt={16}
        sx={{
          height: "100%",
        }}
      >
        {children}
      </Container>
    </main>
  </Shell>
);
