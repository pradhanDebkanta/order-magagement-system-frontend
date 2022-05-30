import React, { useEffect } from 'react';
import Login from '../../component/Auth/Login';
import { gapi } from "gapi-script";
import { clientId } from '../../config/AppConfig';
import { useSelector } from "react-redux";
import { Navigate } from 'react-router-dom';
import { Typography } from 'antd';
import "../../assert/css/login.css";

const { Title } = Typography;


const Index = () => {
  const { isAuthenticated } = useSelector(state => state.auth);
  // console.log(isAuthenticated, "isAuth");
  useEffect(() => {
    const start = () => {
      gapi.client.init(
        {
          clientId: clientId,
          scope: "profile email"
        }
      )
    }
    gapi.load("client:auth2", start);
  }, []);

  return (
    <>{isAuthenticated ? (
      <Navigate to={"/dashboard"} replace />
    ) : (
      <div className='loginContainer'>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <div className="loginBox">
            <div className='heading'>
              <Title level={3}>Login</Title>
            </div>
            <div className='bottom' >
              <Login />
            </div>
          </div>
        </div>
      </div>
    )}
    </>
  )
}

export default Index;