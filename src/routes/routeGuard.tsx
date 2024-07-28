import { Navigate, Outlet, useLocation } from "react-router-dom";

export const isAuthenticated = () => {
  if (localStorage.getItem("bearer")) {
    return true;
  }
  return false;
};

export const levelUser = () => {
  if (localStorage.getItem("level") === "1") {
    return "/dashboard/admin";
  }
  if (localStorage.getItem("level") === "2") {
    return "/dashboard/verificator";
  }
  return "/dashboard/user";
};

export const PublicRoutes = () => {
  const location = useLocation();

  return isAuthenticated() ? (
    <Navigate to={levelUser()} state={{ from: location }} replace />
  ) : (
    <Outlet />
  );
};

export const ProtectedRoutes = () => {
  const location = useLocation();

  return isAuthenticated() ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};
