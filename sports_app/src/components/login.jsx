import React from 'react'
import Login_card from './login_card'

const login = () => {
    return (
        <div className="flex min-h-screen w-screen">
            {/* Left Section - Company Info */}
            <div className="flex items-center w-3/5 justify-center text-white bg-neutral-900">
                <div className="max-w-lg">
                    <h1 className="text-5xl font-bold mb-6">Welcome to Our Company</h1>
                    <p className="text-lg leading-relaxed text-gray-200">
                        We create innovative and reliable solutions that combine
                        cutting-edge technology with a human-first approach.
                    </p>
                </div>
            </div>

            <div className="w-2/5 flex items-center justify-center">
                <Login_card />
            </div>
        </div>
    )
}

export default login