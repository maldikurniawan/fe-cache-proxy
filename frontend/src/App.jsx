import { Layout } from "./components/index";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login/Login";
import { Fragment } from "react";
import DashboardPage from "./pages/Dashboard/DashboardPage";
import AccessLog from "./pages/Monitoring/AccessLog";
import PrivateRoute from "./pages/Login/PrivateRoute";
import StoreLog from "./pages/Monitoring/StoreLog";
import UserAgentLog from "./pages/Monitoring/UserAgentLog";
import CacheLog from "./pages/Monitoring/CacheLog";
import ProfilePage from "./pages/Profile/ProfilePage";

export default function App() {
  return (
    <Fragment>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<PrivateRoute />}>
            <Route element={<Layout />}>
              <Route index element={<DashboardPage />} />
              <Route path="/access" element={<AccessLog />} />
              <Route path="/store" element={<StoreLog />} />
              <Route path="/useragent" element={<UserAgentLog />} />
              <Route path="/cache" element={<CacheLog />} />
              <Route path="/profile" element={<ProfilePage />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </Fragment>
  )
}