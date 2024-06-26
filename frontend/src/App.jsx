import { CompLayout } from "./components/index";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import IsLogin from "./features/auth/isLogin";
import IsAuth from "./features/auth/IsAuth";
import { Fragment } from "react";
import DashboardPage from "./pages/Dashboard/DashboardPage";
import MonitoringPage from "./pages/Monitoring/MonitoringPage";

export default function App() {
  return (
    <Fragment>
      <Routes>
        <Route path="/" element={<IsLogin />}>
          <Route element={<CompLayout />}>
            <Route index element={<DashboardPage />} />
            <Route path="monitoring" element={<MonitoringPage />} />
          </Route>
        </Route>
        <Route element={<IsAuth />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>
      </Routes>
    </Fragment>
  )
}