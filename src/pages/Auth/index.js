import React, { useEffect } from 'react';
import Login from '../../component/Auth/Login';
import { gapi } from "gapi-script";
import { clientId } from '../../config/AppConfig';
import { useSelector } from "react-redux";
import { Navigate } from 'react-router-dom';


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
        <div>
          <Login />
        </div>
      )}
      </>
  )
}

export default Index;