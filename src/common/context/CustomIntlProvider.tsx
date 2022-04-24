/* eslint-disable no-unused-vars */
import { IntlErrorCode } from '@formatjs/intl';
import nl from '@lang/nl.json';
import React, { createContext, FC, PropsWithChildren, useState } from 'react';
import { IntlProvider } from 'react-intl';

export const IntlContext = createContext<[string, (locale: string) => void]>([
  'en',
  (_: string) => {},
]);

const messages = {
  nl,
} as Record<string, Record<string, string>>;

export const CustomIntlProvider: FC<PropsWithChildren<{}>> = ({ children }) => {
  const [locale, setLocale] = useState('en');
  return (
    <IntlContext.Provider value={[locale, setLocale]}>
      <IntlProvider
        locale={locale}
        onError={(err) => err.code === IntlErrorCode.MISSING_TRANSLATION && err}
        messages={messages[locale]}
      >
        {children}
      </IntlProvider>
    </IntlContext.Provider>
  );
};
