import * as React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Layout } from "../components";
import { DashboardPage, Homepage, LoginPage, NotFoundPage, PasswordResetPage, RegisterPage } from "../pages";
import ProtectedRoute from "./ProtectedRoute";
import PublicRoute from "./PublicRoute";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Homepage />} />
          <Route path="register" element={<PublicRoute Element={RegisterPage} />} />
          <Route path="login" element={<PublicRoute Element={LoginPage} />} />
          <Route path="verify/:id/:verificationCode" element={<PublicRoute Element={LoginPage} />} />
          <Route path="password/:passwordResetCode" element={<PasswordResetPage />} />
          <Route path="dashboard" element={<ProtectedRoute Element={DashboardPage} />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
