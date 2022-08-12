import React, {
  createContext,
  PropsWithChildren, ReactNode,
  useContext, useMemo,
  useState,
} from "react";
import { CoaConfiguration } from "../interface";

interface ICoaContext {
  // eslint-disable-next-line no-unused-vars
  setFrame: (key: string) => void;
  frames: Record<string, ReactNode>;
  configuration: CoaConfiguration;
}

export const defaultCoa: ICoaContext = {
  // eslint-disable-next-line no-unused-vars
  setFrame: (key) => {},
  frames: {},
  configuration: {},
};

const CoaContext = createContext<ICoaContext>(defaultCoa);

export const useCoa = () => useContext(CoaContext);

interface CoaProviderProps {
  frames: Record<string, ReactNode>;
}

export const CoaProvider = ({
  children,
  frames
}: PropsWithChildren<CoaProviderProps>) => {
  const [frame, setFrame] = useState<string>();

  const configuration: CoaConfiguration = {
    frame,
  };

  const contextValue: ICoaContext = useMemo(() => ({
    frames,
    setFrame,
    configuration,
  }), [setFrame, configuration])

  return (
    <CoaContext.Provider
      value={contextValue}
    >
      {children}
    </CoaContext.Provider>
  );
};
