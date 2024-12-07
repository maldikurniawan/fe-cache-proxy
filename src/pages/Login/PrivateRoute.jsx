import React from "react";
import { Navigate } from "react-router-dom";
import { Outlet } from "react-router-dom";

const PrivateRoute = () => {
    // const jwt_access = localStorage.getItem("jwt_access");
    // if (jwt_access) {
        return <Outlet />;
    // } else {
    //     return <Navigate to="/login" replace />;
    // }
};

export default PrivateRoute;
