import * as React from "react";
import { ElementType, useState } from "react";
import { BasicXYLine } from "~/assets";
import { Box, createStyles } from "@mantine/core";
import { animated } from "react-spring";
import { useListTransition } from "../hooks/useListTransition";
import { ControlButton } from "./ControlButton";

interface ButtonSelectOption {
  icon: ElementType | string;
  key: string;
}

interface ButtonSelectProps<T> {
  options: T[];
  // eslint-disable-next-line no-unused-vars
  onSelect: (key: string) => void;
}

export const ButtonSelect = <T extends ButtonSelectOption>({
  options,
  onSelect,
}: ButtonSelectProps<T>) => {
  const { classes } = useStyles();
  const [selectedOption, setSelectedOption] = useState<string>();

  const { open, handlers, transition } = useListTransition({
    collection: options,
  });
  return (
    <>
      <Box sx={{ width: "100%", display: "flex", justifyContent: "flex-end" }}>
        <ControlButton
          icon={BasicXYLine}
          onClick={handlers.toggle}
          variant={open ? "light" : "filled"}
        />
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-end",
          width: "100%",
          marginTop: 16,
        }}
      >
        {transition((style, item) => (
          <animated.div style={style}>
            <ControlButton
              icon={item.icon}
              className={classes.option}
              variant={item.key === selectedOption ? "light" : "filled"}
              onClick={() => {
                setSelectedOption(item.key);
                onSelect(item.key);
                handlers.close();
              }}
            />
          </animated.div>
        ))}
      </Box>
    </>
  );
};

const useStyles = createStyles({
  option: {
    marginLeft: 16,
  },
});
