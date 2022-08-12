import * as React from "react";
import { FunctionComponent } from "react";
import { Box } from "@mantine/core";
import { animated } from "react-spring";
import { ControlButton } from "./ControlButton";
import { useListTransition } from "../hooks/useListTransition";
import { useCoa } from "../context/CoaContext";
import { BasicXYLine } from "../../../app/assets";

export const LeftControls: FunctionComponent = () => {
  const {
    setFrame,
    frames,
    configuration: { frame },
  } = useCoa();
  const options = Object.entries(frames).map(([key, value]) => ({
    icon: value,
    key,
  }));

  const { open, handlers, transition } = useListTransition({
    collection: options,
  });

  return (
    <Box
      sx={{
        height: "100%",
        margin: "0 16px",
      }}
    >
      <Box sx={{ width: "100%", display: "flex", justifyContent: "flex-end" }}>
        <ControlButton
          icon={<BasicXYLine />}
          onClick={handlers.toggle}
          variant={open ? "light" : "filled"}
        />
      </Box>
      <div style={{ width: "100%" }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-end",
            marginTop: 16,
          }}
        >
          {transition((style, item) => (
            // eslint-disable-next-line react/no-array-index-key
            <animated.div style={style}>
              <ControlButton
                icon={item.icon}
                style={{ marginLeft: 16 }}
                variant={item.key === frame ? "light" : "filled"}
                onClick={() => {
                  setFrame(item.key);
                  handlers.close();
                }}
              />
            </animated.div>
          ))}
        </Box>
      </div>
    </Box>
  );
};
