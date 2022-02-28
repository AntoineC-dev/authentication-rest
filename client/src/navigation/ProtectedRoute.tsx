import React from "react";
import { Navigate } from "react-router-dom";
import { selectAuthenticated, useAppSelector } from "../redux";

type ProtectedRouteProps = {
  Element: () => JSX.Element;
};

const ProtectedRoute = ({ Element }: ProtectedRouteProps) => {
  const authenticated = useAppSelector(selectAuthenticated);
  if (authenticated) {
    return <Element />;
  } else {
    return <Navigate to="/login" />;
  }
};

export default ProtectedRoute;
