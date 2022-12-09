import { useTransition } from "@remix-run/react";
import { useEffect } from "react";

interface UseTransitionEventParams {
  onActionRedirect?: () => void;
  onActionReload?: () => void;
}

export const useTransitionEvent = ({
  onActionRedirect,
  onActionReload,
}: UseTransitionEventParams) => {
  const { type } = useTransition();

  useEffect(() => {
    // Ready for implementing other events when needed
    switch (type) {
      case "actionRedirect":
        onActionRedirect?.();
        break;
      case "actionReload":
        onActionReload?.();
        break;
      default:
        break;
    }
  }, [type]);
};
