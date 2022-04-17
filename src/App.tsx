import createAuth0Client from "@auth0/auth0-spa-js";
import { ChakraProvider } from "@chakra-ui/react";
import { CustomIntlProvider } from "@common/context/CustomIntlProvider";
import React from "react";
import { IntlProvider } from "react-intl";
import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter } from "react-router-dom";
import { Auth0ClientContextProvider } from "./common/context/Auth0ClientContext";
import { Routes } from "./routes/Routes";

const queryClient = new QueryClient();

export const auth0Client = await createAuth0Client({
  client_id: import.meta.env.VITE_AUTH0_CLIENT_ID as string,
  domain: import.meta.env.VITE_AUTH0_DOMAIN as string,
  audience: import.meta.env.VITE_AUTH0_AUDIENCE as string,
  redirect_uri: window.location.origin,
});

export const App: React.FC = () => {
  return (
    <CustomIntlProvider>
      <ChakraProvider>
        <Auth0ClientContextProvider auth0Client={auth0Client}>
          <QueryClientProvider client={queryClient}>
            <BrowserRouter>
              <Routes />
            </BrowserRouter>
          </QueryClientProvider>
        </Auth0ClientContextProvider>
      </ChakraProvider>
    </CustomIntlProvider>
  );
};
