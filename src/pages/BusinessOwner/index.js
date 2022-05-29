import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import "../../assert/css/global.css";
import Navbar from '../../component/AdminDashboard/Navbar';
import Dashboard from '../../component/AdminDashboard/Dashboard';

const Index = () => {
  const { isAuthenticated } = useSelector(store => store.auth);
  return (
    <>
      {isAuthenticated ? (
        <div className=''>
          <Navbar />
          <div className='container'>
            <Dashboard />
          </div>
        </div>
      ) : (
        <Navigate to={"/login"} replace />
      )}
    </>
  )
}

export default Index;