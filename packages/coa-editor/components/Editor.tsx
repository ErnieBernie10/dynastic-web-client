import * as React from "react";
import { createStyles } from "@mantine/core";
import { CoaProvider, CoaProviderProps } from "../context/CoaContext";
import { LeftConfigurationControls } from "./LeftConfigurationControls";
import { Canvas } from "./Canvas";
import {FinalizationControls} from "./FinalizationControls";
import {CoaConfiguration} from "../interface";

interface EditorProps extends CoaProviderProps {
  // eslint-disable-next-line no-unused-vars
  onExport: (svgBlob: Blob, configuration: CoaConfiguration) => void;
}

const useStyles = createStyles(() => ({
  container: {
    display: "grid",
    gridTemplateColumns: "1fr 3fr 1fr",
    gridTemplateRows: "1fr 1fr 1fr 1fr 1fr",
    gap: "0px 0px",
    gridTemplateAreas: `". . ."
      "left-controls content right-controls"
      "left-controls content right-controls"
      "left-controls content right-controls"
      "bottom-controls bottom-controls bottom-controls"`,
    height: "100%",
    marginLeft: 80,
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    gridArea: "content",
    width: "100%",
    height: 800,
    display: "flex",
    justifyContent: "center",
  },
  leftControls: {
    gridArea: "left-controls",
    height: "100%",
  },
  rightControls: {
    gridArea: "right-controls",
    height: "100%",
  },
  bottomControls: {
    gridArea: "bottom-controls",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    flexDirection: "row",
  },
}));

export const Editor = ({ frames, emblems, onExport }: EditorProps) => {
  const { classes } = useStyles();

  return (
    <CoaProvider frames={frames} emblems={emblems}>
      <div className={classes.container}>
        <div className={classes.leftControls}>
          <LeftConfigurationControls />
        </div>
        <div className={classes.content}>
          <Canvas />
        </div>
        <div className={classes.rightControls} />
        <div className={classes.bottomControls}>
          <FinalizationControls onExport={onExport} />
        </div>
      </div>
    </CoaProvider>
  );
};
