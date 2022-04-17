import { IntlErrorCode } from "@formatjs/intl";
import React, { createContext, FC, PropsWithChildren, useState } from "react";
import { IntlProvider, MissingTranslationError } from "react-intl";

export const IntlContext = createContext<[string, (locale: string) => void]>([
  "en",
  (locale: string) => {},
]);

export const CustomIntlProvider: FC<PropsWithChildren<{}>> = ({ children }) => {
  const [locale, setLocale] = useState("en");
  return (
    <IntlContext.Provider value={[locale, setLocale]}>
      <IntlProvider
        locale={locale}
        onError={(err) =>
          err.code === IntlErrorCode.MISSING_TRANSLATION && err
        }
      >
        {children}
      </IntlProvider>
    </IntlContext.Provider>
  );
};
