import React, { useEffect, useState } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Layout from "../components/Layout";
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import { setAuthHeader, getUserInfo } from "@src/util/authUtils";

const Router: React.FC = () => {
  const [authenticated, setAuthenticated] = useState(false);
  const token = localStorage.getItem("access_token");
  useEffect(() => {
    // root 트리데이터 호출
    if (token) {
      const userInfo = getUserInfo(token);
      if (userInfo) {
        setAuthHeader(token);
        setAuthenticated(true);
      } else {
        setAuthenticated(false);
      }
    }
  }, [token]);

  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route
          path="/login"
          element={
            authenticated ? (
              <Navigate to="/dashboard" />
            ) : (
              <Login setAuthenticated={setAuthenticated} />
            )
          }
        />
        <Route
          path="/dashboard"
          element={
            authenticated ? (
              <Dashboard
                setAuthenticated={setAuthenticated} // 새로 추가된 부분
              />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
      </Route>
    </Routes>
  );
};

export default Router;
