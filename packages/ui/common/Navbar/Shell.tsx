import { AppShell, Header } from "@mantine/core";
import * as React from "react";
import { FunctionComponent, PropsWithChildren, ReactNode } from "react";

interface AppNavbarProps {
  headerSection: ReactNode;
}

export const Shell: FunctionComponent<PropsWithChildren<AppNavbarProps>> = ({
  headerSection,
  children,
}) => (
  <AppShell header={<Header height={70}>{headerSection}</Header>}>
    {children}
  </AppShell>
);
