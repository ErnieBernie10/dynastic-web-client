import { useCallback, useState } from "react";

export const useDrawer = () => {
  const [isOpen, setIsOpen] = useState(false);

  const close = useCallback(() => {
    setIsOpen(false);
  }, []);
  const show = useCallback(() => {
    setIsOpen(true);
  }, []);

  return { show, isOpen, close };
};
