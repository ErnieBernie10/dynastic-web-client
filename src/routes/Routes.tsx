import React, { FC } from 'react';
import { Route, Routes as RouterRoutes } from 'react-router-dom';

import { Home } from './Home';

export const Routes: FC = () => {
  return (
    <RouterRoutes>
      <Route path="/" element={<Home />} />
    </RouterRoutes>
  );
};
