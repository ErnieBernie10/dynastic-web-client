import { Auth0Provider } from "@auth0/auth0-react";
import { ChakraProvider } from "@chakra-ui/react";
import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "./routes/Home";

const queryClient = new QueryClient();

export const App: React.FC = () => {
  return (
    <ChakraProvider>
      <Auth0Provider
        clientId={import.meta.env.VITE_AUTH0_CLIENT_ID as string}
        domain={import.meta.env.VITE_AUTH0_DOMAIN as string}
        audience={import.meta.env.VITE_AUTH0_AUDIENCE as string}
        redirectUri={window.location.origin}
      >
        <QueryClientProvider client={queryClient}>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Home />} />
            </Routes>
          </BrowserRouter>
        </QueryClientProvider>
      </Auth0Provider>
    </ChakraProvider>
  );
};
