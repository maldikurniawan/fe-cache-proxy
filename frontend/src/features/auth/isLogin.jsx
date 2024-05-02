import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

const IsLogin = () => {
    const access = localStorage.getItem("access")
    // console.log(access)
    if (access) {
        return <Outlet />
    } else {
        return <Navigate to={"/login"}/>
    }
}

export default IsLogin