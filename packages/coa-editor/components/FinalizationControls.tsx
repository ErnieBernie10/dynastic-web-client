import { Button } from "@mantine/core";
import * as React from "react";
import { FunctionComponent } from "react";
import { useCoa } from "../context/CoaContext";
import { CoaConfiguration } from "../interface";
import Burgundy from "@resources/images/coa/Burgundy.svg";
import ReactDOMServer from "react-dom/server";

interface FinalizationControlsProps {
  // eslint-disable-next-line no-unused-vars
  onExport: (svgBlob: File, configuration: CoaConfiguration) => void;
}

export const FinalizationControls: FunctionComponent<
  FinalizationControlsProps
> = ({ onExport }) => {
  const { configuration, svg } = useCoa();

  const handleDone = () => {
    if (svg) {
      onExport(
        new File(
          [
            // TODO: Replace this placeholder after full implementation of coa editor is done
            // `<?xml version="1.0" encoding="UTF-8" standalone="no"?>\n${svg.svg()}`,
            ...ReactDOMServer.renderToString(<Burgundy />),
          ],
          "Coa",
          { type: "image/svg+xml" }
        ),
        configuration
      );
    }
  };

  return <Button onClick={handleDone}>Done</Button>;
};
