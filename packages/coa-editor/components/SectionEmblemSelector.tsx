import * as React from "react";
import { FunctionComponent } from "react";
import { EmblemsRecord } from "../interface";
import { ButtonSelect } from "./ButtonSelect";

interface SectionEmblemSelectorProps {
  emblems: EmblemsRecord;
  // eslint-disable-next-line no-unused-vars
  onSelectEmblem: (key: string) => void;
}

export const SectionEmblemSelector: FunctionComponent<
  SectionEmblemSelectorProps
> = ({ emblems, onSelectEmblem }) => {
  const options = Object.entries(emblems).map(([key, value]) => ({
    icon: value.icon,
    key,
  }));

  return <ButtonSelect options={options} onSelect={onSelectEmblem} />;
};
