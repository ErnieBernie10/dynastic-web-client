import { useAuth0 } from "@auth0/auth0-react";
import { Button, Container } from "@chakra-ui/react";
import React from "react";
import { useCurrentUser } from "../api/hooks";

export const Home = () => {
  const { loginWithRedirect, user, isAuthenticated } = useAuth0();
  const { data } = useCurrentUser();
  console.log(user, data);
  return (
    <Container>
      {!isAuthenticated ? (
        <Button onClick={loginWithRedirect}>Login</Button>
      ) : (
        user?.email
      )}
    </Container>
  );
};
