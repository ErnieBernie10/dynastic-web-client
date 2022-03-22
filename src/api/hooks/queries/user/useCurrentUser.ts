import { useAuth0 } from "@auth0/auth0-react";
import { useQuery } from "react-query";
import { getCurrentUser } from "../../../requests";

const withToken = <T>(fn: (token: Promise<string>) => T) => {
  const { getAccessTokenSilently } = useAuth0();

  return () => fn(getAccessTokenSilently());
};

export const useCurrentUser = () =>
  useQuery<string>("currentUser", withToken(getCurrentUser));
