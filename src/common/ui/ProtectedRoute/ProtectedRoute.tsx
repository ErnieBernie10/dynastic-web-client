import { useAuth0Client } from "@common/hooks";
import React from "react";
import { Navigate, Route, RouteProps } from "react-router";

export const ProtectedRoute: React.FC<
  RouteProps & { shouldShowError?: boolean }
> = ({ shouldShowError, ...rest }) => {
  const { isAuthenticated } = useAuth0Client();

  return isAuthenticated ? (
    <Route {...rest} />
  ) : shouldShowError ? (
    // TODO : Show proper error page
    <div>401</div>
  ) : (
    <Navigate to="/" />
  );
};
