import React from 'react'
import Navbar from './components/Navbar'
import { Outlet} from 'react-router-dom';

const body = () => {
    const shouldShowNavbar = location.pathname !== '/'
  return (
    <div className='flex bg-neutral-900 min-h-screen min-w-screen'>
            {shouldShowNavbar && <Navbar />}
            <div className="flex-grow mt-10">
                <Outlet />
            </div>
        </div>
  )
}

export default body