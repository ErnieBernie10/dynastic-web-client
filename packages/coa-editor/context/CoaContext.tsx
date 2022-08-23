import React, {
  createContext,
  PropsWithChildren,
  useContext,
  useMemo,
  useState,
} from "react";
import { CoaConfiguration, EmblemsRecord, FramesRecord } from "../interface";

interface ICoaContext {
  // eslint-disable-next-line no-unused-vars
  setFrame: (key: string) => void;
  // eslint-disable-next-line no-unused-vars
  setEmblem: (key: string, index: number) => void;
  frames: FramesRecord;
  emblems: EmblemsRecord;
  configuration: CoaConfiguration;
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
};

const CoaContext = createContext<ICoaContext>(defaultCoa);

const resizeArrTo = <T,>(length: number, arr: T[], factory: () => T): T[] =>
  length > arr.length
    ? [
        ...arr,
        ...Array(length - arr.length)
          .fill(null)
          .map(factory),
      ]
    : arr.slice(0, arr.length - (arr.length - length));

export const useCoa = () => useContext(CoaContext);

export const CoaProvider = ({
  children,
  frames,
  emblems,
}: PropsWithChildren<CoaProviderProps>) => {
  const [configuration, setConfiguration] = useState<CoaConfiguration>(
    defaultCoa.configuration
  );

  const setFrame = (key: string) =>
    setConfiguration((prev) => ({
      ...prev,
      frame: key,
    }));

  const setEmblem = (key: string, index: number) =>
    setConfiguration((prev) => {
      const newSections = [...(prev.sections ?? [])];
      newSections[index] = {
        element: emblems[key].icon,
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
    }),
    [setFrame, configuration]
  );

  return (
    <CoaContext.Provider value={contextValue}>{children}</CoaContext.Provider>
  );
};
