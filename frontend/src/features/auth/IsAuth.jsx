import React, { useEffect } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import Login from '../../pages/Login'

const IsAuth = () => {
    const access = localStorage.getItem("access")
    // console.log(access)
    if (access) {
        return <Navigate to={"/"} />
    } else {
        return <Login/>
    }
}

export default IsAuth