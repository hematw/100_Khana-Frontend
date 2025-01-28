import "./App.css";
import { Route, Routes, useRoutes } from "react-router-dom";
// import Login from "./pages/Login";
// import Register from "./pages/Register";
// import ProtectedPages from "./pages/ProtectedPages";
// import Home from "./pages/Home";
// import Profile from "./pages/Profile";
// import NotFound from "./pages/NotFound";
// import Logout from "./components/Logout";
// import MyHomes from "./components/MyHomes";
// import DashboardLayout from "./pages/Dashboard";
import routes from "./routes";

function App() {
  document.title = "100 Khana";

  return (
    <>
    <RoutesRenderer/>
      {/* <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/logout" element={<Logout />} />
        <Route index element={<Home />} />
        <Route path="/" element={<ProtectedPages />}>

          <Route path="dashboard" element={<DashboardLayout />} />
          <Route path="profile/me" element={<Profile />} />
          <Route path="profile/homes" element={<MyHomes />} />
          <Route path="profile/:id" element={<Profile />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes> */}
    </>
  );
}

function RoutesRenderer() {
  const element = useRoutes(routes);
  return element;
}

export default App;
