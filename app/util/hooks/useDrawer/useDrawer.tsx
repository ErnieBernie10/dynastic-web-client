import { useContext } from "react";
import { DrawerContext } from "~/util/hooks";

export const useDrawer = () => useContext(DrawerContext);
