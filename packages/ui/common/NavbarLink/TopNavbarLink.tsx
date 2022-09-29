import { Link, useMatches } from "@remix-run/react";
import React, { FunctionComponent } from "react";
import { Anchor, createStyles } from "@mantine/core";
import { primaryColor } from "~/util/fn/colorLevels";
import { NavbarLinkProps } from "./common";

export const TopNavbarLink: FunctionComponent<NavbarLinkProps> = ({
  label,
  to,
  active,
  onClick,
}) => {
  const { classes, cx } = useStyles();
  const matches = useMatches();

  const isActive = active ?? matches.some((m) => m.pathname === to);

  return (
    <Anchor
      component={Link}
      to={to ?? ""}
      className={cx(classes.link, isActive && classes.active)}
      onClick={
        onClick
          ? (e: { preventDefault: () => void }) => {
              e.preventDefault();
              onClick();
            }
          : undefined
      }
    >
      {label}
    </Anchor>
  );
};

const useStyles = createStyles((theme) => ({
  link: {
    padding: "8px 0",
    margin: "8px 0",
    color: `${primaryColor(theme)}`,
  },
  active: {
    borderTop: `4px solid ${theme.primaryColor}`,
    borderBottom: `4px solid ${theme.primaryColor}`,
  },
}));
