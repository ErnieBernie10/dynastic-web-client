import { Auth0Client } from "@auth0/auth0-spa-js";
import React, { createContext, FC } from "react";

export const Auth0Context = createContext<Partial<Auth0ClientContextProviderProps>>(
  {}
);

interface Auth0ClientContextProviderProps {
  auth0Client: Auth0Client;
}
export const Auth0ClientContextProvider: FC<
  Auth0ClientContextProviderProps
> = ({ auth0Client, children }) => {
  return (
    <Auth0Context.Provider value={{ auth0Client }}>
      {children}
    </Auth0Context.Provider>
  );
};
