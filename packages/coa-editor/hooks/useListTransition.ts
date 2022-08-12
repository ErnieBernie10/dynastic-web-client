import { useDisclosure } from "@mantine/hooks";
import { useChain, useSpringRef, useTransition } from "react-spring";
import { useMemo } from "react";

interface UseListTransitionProps<T> {
  collection: T[];
}

interface WithKey {
  key: string;
}

export const useListTransition = <T extends WithKey>({
  collection: col,
}: UseListTransitionProps<T>) => {
  const collection = useMemo(() => col, [col]);
  const [open, handlers] = useDisclosure(false);
  // Build a transition and catch its ref
  const transApi = useSpringRef();
  const transition = useTransition<T, object>(open ? collection : [], {
    ref: transApi,
    trail: 400 / collection.length,
    from: { opacity: 0, scale: 0 },
    enter: { opacity: 1, scale: 1 },
    leave: { opacity: 0, scale: 0 },
    key: (item: T) => item.key
  });
  // First run the spring, when it concludes run the transition
  useChain([transApi], [0, 0.1]);
  // Use the animated props like always

  // const toggle = debounce(handlers.toggle, 200);

  return { transition, open, handlers };
};
