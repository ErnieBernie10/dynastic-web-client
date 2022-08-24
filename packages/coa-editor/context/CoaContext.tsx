import React, {
  createContext,
  PropsWithChildren,
  RefCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import { Svg } from "@svgdotjs/svg.js";
import { CoaConfiguration, EmblemsRecord, FramesRecord } from "../interface";
import { useSvgJs } from "../hooks/useSvgJs";

interface ICoaContext {
  // eslint-disable-next-line no-unused-vars
  setFrame: (key: string) => void;
  // eslint-disable-next-line no-unused-vars
  setEmblem: (key: string, index: number) => void;
  frames: FramesRecord;
  emblems: EmblemsRecord;
  configuration: CoaConfiguration;
  svg?: Svg;
  ref: RefCallback<HTMLElement> | null;
}

export interface CoaProviderProps {
  frames: FramesRecord;
  emblems: EmblemsRecord;
}

export const defaultCoa: ICoaContext = {
  // eslint-disable-next-line no-unused-vars
  setFrame: (key) => {},
  // eslint-disable-next-line no-unused-vars
  setEmblem: (key, index) => {},
  frames: {},
  emblems: {},
  configuration: {},
  svg: undefined,
  ref: null,
};

const CoaContext = createContext<ICoaContext>(defaultCoa);

export const useCoa = () => useContext(CoaContext);

export const CoaProvider = ({
  children,
  frames,
  emblems,
}: PropsWithChildren<CoaProviderProps>) => {
  const [configuration, setConfiguration] = useState<CoaConfiguration>(
    defaultCoa.configuration
  );
  const { ref, svg } = useSvgJs();

  const setFrame = (key: string) =>
    setConfiguration((prev) => ({
      ...prev,
      frame: key,
    }));

  const setEmblem = (key: string, index: number) =>
    setConfiguration((prev) => {
      const newSections = [...(prev.sections ?? [])];
      newSections[index] = {
        emblemKey: key,
      };
      return {
        ...prev,
        sections: newSections,
      };
    });

  const contextValue: ICoaContext = useMemo(
    () => ({
      frames,
      emblems,
      setFrame,
      setEmblem,
      configuration,
      ref,
      svg,
    }),
    [setFrame, configuration]
  );

  return (
    <CoaContext.Provider value={contextValue}>{children}</CoaContext.Provider>
  );
};
