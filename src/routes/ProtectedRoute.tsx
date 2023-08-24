import React, { PropsWithChildren } from "react";
import { Navigate } from "react-router-dom";
import useFakeLogin from "../hooks/useFakeLogin";

const ProtectedRoute: React.FC<PropsWithChildren> = ({ children }) => {
  const { getIsLoggedIn } = useFakeLogin();

  if (!getIsLoggedIn()) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
