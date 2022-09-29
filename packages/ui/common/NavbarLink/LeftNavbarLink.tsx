import React, { FunctionComponent } from "react";
import { Link, useMatches } from "@remix-run/react";
import { NavbarLinkProps } from "@ui/common/NavbarLink/common";
import { Tooltip } from "@ui/common/Tooltip";
import { createStyles, UnstyledButton } from "@mantine/core";

export const LeftNavbarLink: FunctionComponent<NavbarLinkProps> = ({
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
}));
