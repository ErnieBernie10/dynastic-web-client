import { Button } from "@mantine/core";
import * as React from "react";
import { FunctionComponent } from "react";
import { useCoa } from "../context/CoaContext";
import { CoaConfiguration } from "../interface";

interface FinalizationControlsProps {
  // eslint-disable-next-line no-unused-vars
  onExport: (svgBlob: Blob, configuration: CoaConfiguration) => void;
}

export const FinalizationControls: FunctionComponent<
  FinalizationControlsProps
> = ({ onExport }) => {
  const { configuration, svg } = useCoa();

  const handleDone = () => {
    if (svg) {
      onExport(new Blob([svg.svg()], { type: "image/svg+xml" }), configuration);
    }
  };

  return <Button onClick={handleDone}>Done</Button>;
};
