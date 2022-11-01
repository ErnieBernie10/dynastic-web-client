import { useTransition } from "@remix-run/react";
import { useEffect } from "react";

interface UseTransitionEventParams {
  onActionRedirect: () => void;
}

export const useTransitionEvent = ({
  onActionRedirect,
}: UseTransitionEventParams) => {
  const { type } = useTransition();

  useEffect(() => {
    // Ready for implementing other events when needed
    switch (type) {
      case "actionRedirect":
        onActionRedirect();
        break;
      default:
        break;
    }
  }, [type]);
};
