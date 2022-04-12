import { User } from "@auth0/auth0-spa-js";
import { useState, useEffect, useContext } from "react";
import { Auth0Context } from "../context/Auth0ClientContext";

export const useAuth0Client = () => {
  const [user, setUser] = useState<User>();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>();

  const { auth0Client } = useContext(Auth0Context);

  if (!auth0Client)
    throw Error(
      "auth0 must be present in context when using useAuth0Client hook"
    );

  useEffect(() => {
    auth0Client
      .handleRedirectCallback()
      .then(() =>
        auth0Client
          .isAuthenticated()
          .then((response) => setIsAuthenticated(response))
      );
  }, []);

  useEffect(() => {
    auth0Client.getUser().then((response) => setUser(response));
  }, [isAuthenticated]);

  return {
    auth0Client,
    authenticatedUser: user,
    isAuthenticated,
  };
};
