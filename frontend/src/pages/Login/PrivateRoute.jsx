import React from "react";
import { Navigate } from "react-router-dom";
import { Outlet } from "react-router-dom";

const PrivateRoute = () => {
    const access = localStorage.getItem("access");
    if (access) {
        return <Outlet />;
    } else {
        return <Navigate to="/login" replace />;
    }
};

export default PrivateRoute;
