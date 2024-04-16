import { Route, Routes } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";

export default function App() {
  return (
    <div className="text-white h-[100vh] flex justify-center items-center bg-cover" style={{ "background": "url('../src/assets/bg.jpg')" }}>
      <Routes>
        <Route path="" element={<Login />} />
        <Route path="register" element={<Register />} />
      </Routes>
    </div>
  )
}