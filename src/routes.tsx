import Logout from "./components/Logout";
import DashboardLayout from "./pages/Dashboard";
import {
  Register,
  Login,
  NotFound,
  Profile,
  ProtectedPages,
  Home,
} from "./pages/index";

import { RouteObject } from "react-router-dom";
import PublicLayout from "./pages/PublicLayout";

const routes: RouteObject[] = [
  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },
  { path: "logout", element: <Logout /> },
  {
    path: "/", element: <PublicLayout />,
    children: [
      { index: true, element: <Home /> },
    ]
  },
  {
    path: "/", element: <ProtectedPages />,
    children: [
      { path: "profile/me", element: <Profile />, },
      { path: "profile/homes", element: <Profile />, },
      { path: "dashboard", element: <DashboardLayout />, },
      { path: "profile/:id", element: <DashboardLayout />, }
    ]
  },
  { path: "*", element: <NotFound /> }
];

export default routes
