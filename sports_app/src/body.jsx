import React, { useEffect } from 'react';
import Navbar from './components/Navbar';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

const Body = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const shouldShowNavbar = location.pathname !== '/';

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token && location.pathname !== '/') {
            navigate('/');
        }
    }, [location, navigate]);

    return (
        <div className='flex bg-neutral-900 min-h-screen min-w-screen'>
            {shouldShowNavbar && <Navbar />}
            <div className="flex-grow mt-10">
                <Outlet />
            </div>
        </div>
    );
};

export default Body;