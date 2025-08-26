import React from 'react'
import ComTabs from './com_tabs'

const Community = () => {
    const stats = [
        { label: "Active Users", value: "12.5K", change: "+12%" },
        { label: "Matches Played", value: "45.2K", change: "+8%" },
        { label: "Tournaments", value: "156", change: "+15%" },
        { label: "Countries", value: "32", change: "+3" }
    ]

    return (
        <div className="min-h-screen w-screen bg-neutral-900">
            {/* Hero Section */}
            <div className="relative overflow-hidden bg-gradient-to-r bg-neutral-900">
                <div className="absolute inset-0 bg-black opacity-10"></div>
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                    <div className="text-center">
                        <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                            Community Hub
                        </h1>
                        <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
                            Connect, compete, and celebrate with sports enthusiasts from around the world
                        </p>
                    </div>
                </div>
            </div>
            {/* ComTabs Component */}
            <ComTabs />
            <div className="flex flex-col sm:flex-row gap-4 justify-center p-10">
                {/* Test button to verify hover works */}
                <button 
                    onClick={() => alert('Join Community clicked!')}
                    className="border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-neutral-900 transition-all cursor-pointer"
                >
                    Join Community
                </button>
                <button 
                    onClick={() => alert('Learn More clicked!')}
                    className="border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-neutral-900 transition-all cursor-pointer"
                >
                    Learn More
                </button>
            </div>

            {/* Stats Section */}
            <div className="bg-white shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {stats.map((stat, index) => (
                            <div key={index} className="text-center">
                                <div className="text-2xl md:text-3xl font-bold text-gray-900">{stat.value}</div>
                                <div className="text-sm text-gray-600">{stat.label}</div>
                                <div className="text-xs text-green-600 font-medium">{stat.change}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Community
