import { Auth0Client, User } from '@auth0/auth0-spa-js';
import {
  useState, useEffect, useContext, createContext,
} from 'react';
import { useLocation, useNavigate } from 'react-router';
import { Auth0Context } from '../context/Auth0ClientContext';

export const useAuth0Client = () => {
  const { pathname, search } = useLocation();
  const navigate = useNavigate();

  const {
    auth0Client,
    isAuthenticated: [isAuthenticated, setIsAuthenticated],
    authenticatedUser: [user, setUser],
  } = useContext(Auth0Context);

  if (!auth0Client) {
    throw Error(
      'auth0 must be present in context when using useAuth0Client hook',
    );
  }

  useEffect(() => {
    if (search.includes('code')) {
      auth0Client.handleRedirectCallback().then(() => auth0Client.isAuthenticated().then((response) => {
        setIsAuthenticated(response);
        navigate(pathname);
      }));
    } else {
      auth0Client.getTokenSilently().then((_) => auth0Client.getUser().then((user) => {
        setUser?.(user);
        setIsAuthenticated(true);
      }));
    }
  }, [search]);

  useEffect(() => {
    if (!user) {
      auth0Client.getUser().then((response) => setUser?.(response));
    }
  }, [isAuthenticated]);

  return {
    auth0Client,
    authenticatedUser: user,
    isAuthenticated,
  };
};
