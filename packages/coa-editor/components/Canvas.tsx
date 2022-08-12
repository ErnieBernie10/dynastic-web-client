import { Box } from "@mantine/core";
import * as React from "react";
import { FunctionComponent } from "react";
import { useCoa } from "../context/CoaContext";

interface CanvasProps {}

export const Canvas: FunctionComponent<CanvasProps> = () => {
  const {
    frames,
    configuration: { frame },
  } = useCoa();

  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        "> svg": {
          width: "100%",
          height: "100%",
        },
      }}
    >
      {frame && frames[frame]}
    </Box>
  );
};
