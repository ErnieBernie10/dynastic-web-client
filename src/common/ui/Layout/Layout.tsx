import { Container } from '@chakra-ui/react';
import React, { PropsWithChildren } from 'react';

import { Navbar } from './Navbar';

export const Layout: React.FC<PropsWithChildren<{}>> = ({ children }) => {
  return (
    <>
      <Navbar />
      <Container>{children}</Container>
    </>
  );
};
