import {
  Center,
  createStyles,
  Navbar,
  Stack,
  UnstyledButton,
} from "@mantine/core";
import * as React from "react";
import { FunctionComponent, ReactNode } from "react";
import { Link, useMatches } from "@remix-run/react";
import { TablerIcon } from "@tabler/icons";
import { Tooltip } from "../Tooltip";

interface AppNavbarProps {
  topSection: ReactNode;
  bottomSection: ReactNode;
}

const useStyles = createStyles((theme) => ({
  link: {
    width: 50,
    height: 50,
    borderRadius: theme.radius.md,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[0]
        : theme.colors.gray[7],

    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[5]
          : theme.colors.gray[0],
    },
  },

  active: {
    "&, &:hover": {
      backgroundColor: theme.fn.variant({
        variant: "light",
        color: theme.primaryColor,
      }).background,
      color: theme.fn.variant({ variant: "light", color: theme.primaryColor })
        .color,
    },
  },
  navbar: {
    position: "absolute",
  },
}));

export const AppNavbar: FunctionComponent<AppNavbarProps> = ({
  topSection,
  bottomSection,
}) => {
  const { classes } = useStyles();
  return (
    <Navbar width={{ base: 80 }} p="md" className={classes.navbar}>
      <Center>Dynastic</Center>
      <Navbar.Section grow mt={50}>
        <Stack justify="center" spacing={0}>
          {topSection}
        </Stack>
      </Navbar.Section>
      <Navbar.Section>
        <Stack justify="center" spacing={0}>
          {bottomSection}
        </Stack>
      </Navbar.Section>
    </Navbar>
  );
};

interface NavbarLinkProps {
  label: string;
  to?: string;
  onClick?: () => void;
  icon: TablerIcon;
  active?: boolean;
}

export const NavbarLink: FunctionComponent<NavbarLinkProps> = ({
  label,
  icon: Icon,
  to,
  onClick,
  active,
}) => {
  const { classes, cx } = useStyles();
  const matches = useMatches();

  const isActive = active ?? matches.some((m) => m.pathname === to);

  return (
    <Tooltip label={label} position="right">
      {to ? (
        <UnstyledButton
          component={Link}
          to={to}
          className={cx(classes.link, { [classes.active]: isActive })}
        >
          <Icon stroke={1.5} />
        </UnstyledButton>
      ) : (
        onClick && (
          <UnstyledButton
            onClick={onClick}
            className={cx(classes.link, { [classes.active]: active })}
          >
            <Icon stroke={1.5} />
          </UnstyledButton>
        )
      )}
    </Tooltip>
  );
};
