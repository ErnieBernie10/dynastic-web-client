import { Box } from "@mantine/core";
import * as React from "react";
import { FunctionComponent, useEffect } from "react";
import { useCoa } from "../context/CoaContext";
import { renderSections } from "../util/coaConfigurationRenderer";

interface CanvasProps {}

export const Canvas: FunctionComponent<CanvasProps> = () => {
  const {
    frames,
    emblems,
    configuration: { frame, sections },
    ref,
    svg,
  } = useCoa();

  const Frame = frame ? frames[frame].icon : null;

  useEffect(() => {
    if (svg) {
      renderSections(svg, emblems, sections);
    }
  }, [svg, sections]);

  return (
    <Box
      sx={{
        width: "400px",
        height: "100%",
        "> svg": {
          width: "400px",
          height: "100%",
        },
      }}
    >
      {Frame && <Frame ref={ref} />}
    </Box>
  );
};
