import { ActionIcon, ActionIconProps, createStyles } from "@mantine/core";
import * as React from "react";
import {ElementType, FunctionComponent} from "react";

export interface ControlButtonProps extends ActionIconProps {
  icon: ElementType | string;
  onClick: () => void;
}

export const ControlButton: FunctionComponent<ControlButtonProps> = ({
  icon,
  className,
  ...rest
}) => {
  const { classes, cx } = useStyles();
  const Icon = icon;
  return (
    <ActionIcon
      variant="filled"
      size={64}
      color="primary"
      {...rest}
      className={cx(classes.actionIcon, className)}
    >
      <Icon />
    </ActionIcon>
  );
};

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
