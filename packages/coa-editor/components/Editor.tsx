import * as React from "react";
import { createStyles } from "@mantine/core";
import { ReactNode } from "react";
import { CoaProvider } from "../context/CoaContext";
import { LeftControls } from "./LeftControls";
import {Canvas} from "./Canvas";

interface EditorProps<T extends string> {
  frames: Record<T, ReactNode>;
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
      ". . ."`,
    height: "100%",
    marginLeft: 80,
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    gridArea: "content",
    width: "100%",
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
}));

export const Editor = <T extends string>({ frames }: EditorProps<T>) => {
  const { classes } = useStyles();
  return (
    <CoaProvider frames={frames}>
      <div className={classes.container}>
        <div className={classes.leftControls}>
          <LeftControls />
        </div>
        <div className={classes.content}>
          <div
            style={{
              height: 800,
              width: "100%",
            }}
          >
            <Canvas />
          </div>
        </div>
        <div className={classes.rightControls} />
      </div>
    </CoaProvider>
  );
};
