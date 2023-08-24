import React from "react";
import { Route, Routes } from "react-router-dom";
import Layout from "../components/Layout";
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";

const Router: React.FC = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/login" element={<Login name="로그인" />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Route>
    </Routes>
  );
};

export default Router;
