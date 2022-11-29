import * as React from "react";
import {
  FunctionComponent,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";
import { theme } from "~/theme";
import { DrawerProvider } from "~/util/hooks";
import {
  ColorScheme,
  ColorSchemeProvider,
  MantineProvider,
  useEmotionCache,
} from "@mantine/core";

export interface ClientStyleContextData {
  reset: () => void;
}

export const ClientStyleContext =
  React.createContext<ClientStyleContextData | null>(null);
export const RootProviders: FunctionComponent<PropsWithChildren> = ({
  children,
}) => {
  const [colorScheme, setColorScheme] = useState<ColorScheme>("light");
  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));

  const clientStyleData = useContext(ClientStyleContext);
  const mantineCache = useEmotionCache();

  useEffect(() => {
    const cache = mantineCache;
    cache.sheet.container = document.head;
    const { tags } = cache.sheet;
    cache.sheet.flush();
    tags.forEach((tag) => {
      // eslint-disable-next-line no-underscore-dangle
      (cache.sheet as any)._insertTag(tag);
    });
    clientStyleData?.reset();
  }, []);

  return (
    <ColorSchemeProvider
      colorScheme={colorScheme}
      toggleColorScheme={toggleColorScheme}
    >
      <MantineProvider
        // TODO: Fix this shit
        theme={theme("dark")}
        withGlobalStyles
        withNormalizeCSS
      >
        <DrawerProvider>{children}</DrawerProvider>
      </MantineProvider>
    </ColorSchemeProvider>
  );
};
