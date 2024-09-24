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
import ServerPage from "./pages/Server/ServerPage";
import ServerForm from "./pages/Server/ServerForm";

export default function App() {
  return (
    <Fragment>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<PrivateRoute />}>
            <Route element={<Layout />}>
              <Route index element={<DashboardPage />} />
              {/* Monitoring Access Log */}
              <Route path="/access" element={<AccessLog />} />

              {/* Monitoring Store Log */}
              <Route path="/store" element={<StoreLog />} />

              {/* Monitoring UserAgent Log */}
              <Route path="/useragent" element={<UserAgentLog />} />

              {/* Monitoring Cache Log */}
              <Route path="/cache" element={<CacheLog />} />

              {/* Profile */}
              <Route path="/profile" element={<ProfilePage />} />

              {/* Server */}
              <Route path="/server" element={<ServerPage />} />
              <Route path="/server/form" element={<ServerForm />} />
              <Route path="/server/form/:id" element={<ServerForm />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </Fragment>
  )
}