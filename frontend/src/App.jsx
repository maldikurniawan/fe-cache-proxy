import { CompLayout } from "./components/index";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login/Login";
import { Fragment } from "react";
import DashboardPage from "./pages/Dashboard/DashboardPage";
import MonitoringPage from "./pages/Monitoring/MonitoringPage";
import PrivateRoute from "./pages/Login/PrivateRoute";

export default function App() {
  return (
    <Fragment>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<PrivateRoute />}>
            <Route element={<CompLayout />}>
              <Route index element={<DashboardPage />} />
              <Route path="monitoring" element={<MonitoringPage />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </Fragment>
  )
}