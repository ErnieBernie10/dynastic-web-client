import * as React from "react";
import { FunctionComponent } from "react";
import { Tooltip as MTooltip, TooltipProps } from "@mantine/core";

export const Tooltip: FunctionComponent<TooltipProps> = (props) => (
  <MTooltip {...props} />
);

Tooltip.displayName = "ui/Tooltip";
