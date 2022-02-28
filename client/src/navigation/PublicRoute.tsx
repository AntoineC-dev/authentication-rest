import React from "react";
import { Navigate } from "react-router-dom";
import { selectAuthenticated, useAppSelector } from "../redux";

type PublicRouteProps = {
  Element: () => JSX.Element;
};

const PublicRoute = ({ Element }: PublicRouteProps) => {
  const authenticated = useAppSelector(selectAuthenticated);
  if (!authenticated) {
    return <Element />;
  } else {
    return <Navigate to="/dashboard" />;
  }
};

export default PublicRoute;
