import React, { FunctionComponent } from "react";
import { EmblemsRecord } from "../interface";
import { SectionEmblemSelector } from "./SectionEmblemSelector";

interface EmblemSelectorProps {
  emblems: EmblemsRecord;
  // eslint-disable-next-line no-unused-vars
  onSelectEmblem: (key: string, sectionIndex: number) => void;
  sectionsCount: number;
}

export const EmblemsSelector: FunctionComponent<EmblemSelectorProps> = ({
  emblems,
  onSelectEmblem,
  sectionsCount,
}) => (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>
      {Array(7)
        .fill(null)
        .map((section, index) => (
          <SectionEmblemSelector
            // eslint-disable-next-line react/no-array-index-key
            key={index}
            emblems={emblems}
            onSelectEmblem={(key) => onSelectEmblem(key, index)}
          />
        ))}
    </>
  );
