import * as React from "react";
import {
  createContext,
  FunctionComponent,
  PropsWithChildren,
  useCallback,
  useMemo,
  useState,
} from "react";

interface DrawerContextInterface {
  // eslint-disable-next-line no-unused-vars
  show: () => void;
  close: () => void;
  isOpen: boolean;
}

export const DrawerContext = createContext<DrawerContextInterface>({
  close: () => {},
  show: () => null,
  isOpen: false,
});

export const DrawerProvider: FunctionComponent<PropsWithChildren<{}>> = ({
  children,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const close = useCallback(() => {
    setIsOpen(false);
  }, []);
  const show = useCallback(() => {
    setIsOpen(true);
  }, []);

  const value = useMemo(() => ({ close, show, isOpen }), [close, show, isOpen]);

  return (
    <DrawerContext.Provider value={value}>{children}</DrawerContext.Provider>
  );
};
