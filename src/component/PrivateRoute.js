import React from 'react';
import { Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { signIn } from '../store/actions/auth';
const PrivateRoute = ({ children }) => {
    const dispatch = useDispatch();
    const { isAuthenticated } = useSelector(store => store.auth);
    const lsData = localStorage.getItem("profile");
    const loginCridentials = lsData ? JSON.parse(lsData) : {};
    // console.log(loginCridentials);

    if (Object.keys(loginCridentials).length === 0) {
        return <Navigate to={"/login"} replace />
    } else {
        if (!isAuthenticated) {
            let data = { ...loginCridentials, userRole: "owner" };
            dispatch(signIn(data));
        }
        return children;
    }
}

export default PrivateRoute;