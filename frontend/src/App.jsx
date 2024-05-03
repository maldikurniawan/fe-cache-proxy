import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Layout from "./components/shared/Layout";
import Monitoring from "./pages/Monitoring";
import UserAccount from "./pages/UserAccount";
import IsLogin from "./features/auth/isLogin";

export default function App() {
  return (
    <Routes>
      <Route element={<IsLogin />}>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/monitoring" element={<Monitoring />} />
          <Route path="/userAccount" element={<UserAccount />} />
        </Route>
      </Route>

      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  )
}