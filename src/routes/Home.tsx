import { Button, Container } from "@chakra-ui/react";
import { useGetDynasties } from "../api/hooks/queries/useDynasties";
import { auth0Client } from "../App";
import { useAuth0Client } from "../common/hooks/useAuth0Client";

export const Home = () => {

  const { isAuthenticated, authenticatedUser, auth0Client } = useAuth0Client();

  const { data, error } = useGetDynasties();

  console.log(data, error);

  return (
    <Container>
      {!isAuthenticated ? (
        <Button onClick={() => auth0Client.loginWithRedirect()}>Login</Button>
      ) : (
        authenticatedUser?.name
      )}
    </Container>
  );
};
