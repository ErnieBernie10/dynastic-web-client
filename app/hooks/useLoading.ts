import { useTransition } from "@remix-run/react";

export const useLoading = () => {
  const { state } = useTransition();
  return state === "loading" || state === "submitting";
};
