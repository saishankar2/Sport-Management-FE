import { useState, useEffect } from 'react';
import { Routes, Route, useLocation, Navigate, Outlet } from 'react-router-dom';
import './index.css';
import Login from './pages/login';
import Community from './pages/community';
import Dashboard from './pages/dashboard';
import Body from './body';
import Attendance from './pages/attendance';
import Mark_attendance from './pages/mark_attendance';

const PrivateRoute = () => {
  const token = localStorage.getItem('token');
  return token ? <Outlet /> : <Navigate to="/" />;
};

function App() {
  const location = useLocation();

  useEffect(() => {
    const handleStorageChange = () => {
      if (!localStorage.getItem('token')) {
        window.location.href = '/';
      }
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  return (
    <>
      <Routes>
        <Route path="/" element={<Body />}>
          <Route path="/" element={<Login />} />
          <Route element={<PrivateRoute />}>
            <Route path="/community" element={<Community />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/attendance" element={<Attendance />} />
            <Route path="/mark_attendance" element={<Mark_attendance />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;