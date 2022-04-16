import { Container } from "@chakra-ui/react";
import { Navbar } from "./Navbar";

export const Layout: React.FC = ({ children }) => {
  return (
    <>
      <Navbar />
      <Container>{children}</Container>
    </>
  );
};
