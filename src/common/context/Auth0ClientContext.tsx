import { Auth0Client, User } from "@auth0/auth0-spa-js";
import React, { createContext, FC, useState } from "react";

interface Auth0ClientContextData {
  auth0Client: Auth0Client;
  authenticatedUser: [User?, ((user?: User) => void)?];
  isAuthenticated: [boolean, (bool: boolean) => void];
}
export const Auth0Context = createContext<Auth0ClientContextData>({
  auth0Client: null as unknown as Auth0Client,
  authenticatedUser: [null as unknown as User, () => {}],
  isAuthenticated: [false, () => {}],
});

interface Auth0ClientContextProviderProps {
  auth0Client: Auth0Client;
}
export const Auth0ClientContextProvider: FC<
  Auth0ClientContextProviderProps
> = ({ auth0Client, children }) => {
  const authenticatedUser = useState<User>();
  const isAuthenticated = useState<boolean>(false);
  return (
    <Auth0Context.Provider
      value={{ auth0Client, authenticatedUser, isAuthenticated }}
    >
      {children}
    </Auth0Context.Provider>
  );
};
