import { ActionIcon, ActionIconProps, createStyles } from "@mantine/core";
import * as React from "react";
import { FunctionComponent, ReactNode } from "react";

export interface ControlButtonProps extends ActionIconProps {
  icon: ReactNode;
  onClick: () => void;
}

const useStyles = createStyles(() => ({
  actionIcon: {
    "> svg": {
      width: "100%",
      height: "100%",
    },
    display: "inline-block",
    padding: 8,
  },
}));

export const ControlButton: FunctionComponent<ControlButtonProps> = ({
  icon,
  ...rest
}) => {
  const { classes } = useStyles();
  return (
    <ActionIcon
      variant="filled"
      size={64}
      color="primary"
      {...rest}
      className={classes.actionIcon}
    >
      {icon}
    </ActionIcon>
  );
};
