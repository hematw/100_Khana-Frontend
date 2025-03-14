import Logout from "./components/Logout";
import DashboardLayout from "./pages/Dashboard";
import { Register, Login, NotFound, AccountLayout, Home } from "./pages/index";

import { RouteObject } from "react-router-dom";
import PublicLayout from "./pages/PublicLayout";
import AddHome from "./components/property-form";
import MyHouses from "./components/account/my-houses";
import Profile from "./components/account/profile";
import SavedHouses from "./components/account/saved-houses";
import HouseDetail from "./pages/house-detail";

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
        element: <Home />,
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
