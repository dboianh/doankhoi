import React from "react"
import { Navigate } from "react-router-dom"
import { useCookies } from 'react-cookie';

const AuthJWT = ( { children }) => {
    const [cookies, setCookie, removeCookie] = useCookies(['token']);

    return cookies.token ? children : <Navigate to="/login"/>;
}

export default AuthJWT