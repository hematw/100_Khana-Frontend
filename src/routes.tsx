import Logout from "./components/Logout";
import DashboardLayout from "./pages/Dashboard";
import {
  Register,
  Login,
  NotFound,
  Profile,
  AccountLayout,
  Home,
} from "./pages/index";

import { RouteObject } from "react-router-dom";
import PublicLayout from "./pages/PublicLayout";
import AddHome from "./components/property-form";

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
  { path: "/properties", element: <AddHome />, },
  {
    path: "/account", element: <AccountLayout />,
    children: [
      { path: "profile", element: <Profile />, },
      { path: "profile/homes", element: <Profile />, },
      { path: "dashboard", element: <DashboardLayout />, },
      { path: "profile/:id", element: <DashboardLayout />, },
    ]
  },
  { path: "*", element: <NotFound /> }
];

export default routes
