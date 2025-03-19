import { RouteObject } from "react-router-dom";

import Logout from "./components/Logout";
import Properties from "./pages/properties";
import HouseDetail from "./pages/house-detail";
import DashboardLayout from "./pages/Dashboard";
import PublicLayout from "./pages/PublicLayout";
import AddHome from "./components/property-form";
import Profile from "./components/account/profile";
import MyHouses from "./components/account/my-houses";
import SavedHouses from "./components/account/saved-houses";
import { Register, Login, NotFound, AccountLayout, Home } from "./pages/index";

const routes: RouteObject[] = [
  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },
  { path: "logout", element: <Logout /> },
  {
    path: "/",
    element: <PublicLayout />,
    children: [
      { index: true, element: <Home /> },
      {
        path: "properties",
        element: <Properties />,
      },
      {
        path: "properties/:id",
        element: <HouseDetail />,
        // children: [
        //   { index: true, element: <Home /> },
        // ],
      },
      {
        path: "account",
        element: <AccountLayout />,
        children: [
          { index: true, element: <Profile /> },
          { path: "my-houses", element: <MyHouses /> },
          { path: "saved-ads", element: <SavedHouses /> },
        ],
      },
    ],
  },
  { path: "/new-property", element: <AddHome /> },
  { path: "dashboard", element: <DashboardLayout /> },
  { path: "profile/:id", element: <DashboardLayout /> },
  { path: "*", element: <NotFound /> },
];

export default routes;
