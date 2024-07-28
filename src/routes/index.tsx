import { Login } from "@/pages/auth/Login";
import { Register } from "@/pages/auth/Register";
import DashboardAdmin from "@/pages/dashboard/admin";
import DashboardUser from "@/pages/dashboard/user";
import DashboardVerificator from "@/pages/dashboard/verificator";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ProtectedRoutes, PublicRoutes } from "./routeGuard";

const router = createBrowserRouter([
  {
    element: <PublicRoutes />,
    children: [
      {
        path: "*",
        element: <Login />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
    ],
  },

  {
    element: <ProtectedRoutes />,
    children: [
      {
        path: "/dashboard/admin",
        element: <DashboardAdmin />,
      },
      {
        path: "/dashboard/verificator",
        element: <DashboardVerificator />,
      },
      {
        path: "/dashboard/user",
        element: <DashboardUser />,
      },
    ],
  },
]);

export default function Routes() {
  return <RouterProvider router={router} />;
}
