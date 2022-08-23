import * as React from "react";
import { FunctionComponent } from "react";
import { FramesRecord } from "../interface";
import {ButtonSelect} from "./ButtonSelect";

interface FrameSelectorProps {
  frames: FramesRecord;
  // eslint-disable-next-line no-unused-vars
  onSelectFrame: (key: string) => void;
}

export const FrameSelector: FunctionComponent<FrameSelectorProps> = ({
  frames,
  onSelectFrame,
}) => {
  const options = Object.entries(frames).map(([key, value]) => ({
    icon: value.icon,
    key,
  }));

  return (
    <ButtonSelect onSelect={onSelectFrame} options={options} />
  );
};
