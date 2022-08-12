import * as React from "react";
import { FunctionComponent, PropsWithChildren } from "react";
import { Container } from "@mantine/core";
import { AppNavbar, NavbarLink } from "@ui/common";
import { IconHome, IconSettings } from "@tabler/icons";

interface MainLayoutProps {}

export const MainLayout: FunctionComponent<
  PropsWithChildren<MainLayoutProps>
> = ({ children }) => (
    <>
      <AppNavbar
        topSection={<NavbarLink label="Home" icon={IconHome} to="/dashboard" />}
        bottomSection={
          <NavbarLink label="Settings" icon={IconSettings} to="/settings" />
        }
      />
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
    </>
  );
