import * as React from "react";
import { FunctionComponent } from "react";
import { Box } from "@mantine/core";
import { useCoa } from "../context/CoaContext";
import { FrameSelector } from "./FrameSelector";
import { EmblemsSelector } from "./EmblemsSelector";

export const LeftConfigurationControls: FunctionComponent = () => {
  const {
    setFrame,
    setEmblem,
    frames,
    emblems,
    configuration: { frame },
  } = useCoa();

  const handleSelectEmblem = (key: string, sectionIndex: number) =>
    setEmblem(key, sectionIndex);

  return (
    <Box
      sx={{
        height: "100%",
        width: "100%",
        margin: "0 16px",
      }}
    >
      <FrameSelector frames={frames} onSelectFrame={(key) => setFrame(key)} />
      <EmblemsSelector
        emblems={emblems}
        onSelectEmblem={handleSelectEmblem}
      />
    </Box>
  );
};
