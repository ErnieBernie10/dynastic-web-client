import { useAuth0Client } from '@common/hooks';
import React from 'react';
import { Navigate, Route, RouteProps } from 'react-router';

export const ProtectedRoute: React.FC<RouteProps & { shouldShowError?: boolean }> = ({
  shouldShowError,
  ...rest
}) => {
  const { isAuthenticated } = useAuth0Client();

  if (isAuthenticated) {
    return <Route {...rest} />;
  } else if (shouldShowError) {
    // TODO : Show proper error page
    return <div>401</div>;
  } else {
    return <Navigate to="/" />;
  }
};
