import React from 'react'
import Login_card from '../components/login_card'

const login = () => {
    return (
        <div className="flex flex-col lg:flex-row h-screen w-screen -mt-10">
            {/* Left Section - Company Info */}
            <div className="flex items-center justify-center text-white bg-neutral-900 w-full lg:w-3/5 p-6 lg:p-0 order-1 lg:order-1">
                <div className="max-w-lg text-center lg:text-left">
                    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 lg:mb-6">Welcome</h1>
                    <p className="hidden lg:block text-base sm:text-lg leading-relaxed text-gray-200">
                        We create innovative and reliable solutions that combine
                        cutting-edge technology with a human-first approach.
                    </p>
                </div>
            </div>

            {/* Right Section - Login Card */}
            <div className="flex h-full items-center justify-center lg:w-2/5 order-2 bg-white">
                <div className="w-full flex items-center justify-center p-6 lg:p-0 order-2 lg:order-2 min-h-full lg:min-h-0">
                    <Login_card />
                </div>
            </div>
            
        </div>
    )
}

export default login