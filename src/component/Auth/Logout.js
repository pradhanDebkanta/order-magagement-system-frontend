import React from 'react'
import { GoogleLogout } from 'react-google-login';
import { clientId } from '../../config/AppConfig';
import { signOut } from '../../store/actions/auth';
import { useDispatch } from "react-redux";
import "../../assert/css/navbar.css";
import { message } from "antd"


const Logout = () => {
    const dispatch = useDispatch();
    const logoutSuccess = () => {
        // console.log("successfully  logout");
        localStorage.clear();
        // here dispatch logout
        dispatch(signOut());
        message.success("You have logout successfully.")
    }

    return (
        <div className='logoutButton'>
            <GoogleLogout
                clientId={clientId}
                // buttonText="Logout"
                onLogoutSuccess={logoutSuccess}
            >
                <span style={{ fontSize: "18px", fontWidth: 600, color: "#555" }}> Logout</span>
            </GoogleLogout>
        </div>
    )
}

export default Logout