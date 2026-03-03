import { createBrowserRouter } from "react-router-dom";
import { layoutRoutes, basicRoutes } from "./layoutRoutes";
import { RouteObject } from "react-router-dom";
import AuthRoute from "../components/common/AuthRoute";
import ErrorBoundary from "../components/common/ErrorBoundary";
import MainLayout from "../layouts";
import { Outlet } from "react-router-dom";

const Layout = () => (
  <MainLayout>
    <Outlet />
  </MainLayout>
);

const routes: RouteObject[] = [
  {
    path: "/",
    element: (
      <ErrorBoundary>
        <AuthRoute>
          <Layout />
        </AuthRoute>
      </ErrorBoundary>
    ),
    children: layoutRoutes,
  },
  ...basicRoutes,
];

const router = createBrowserRouter(routes);

export default router;
