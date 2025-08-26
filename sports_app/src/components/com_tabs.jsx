import React, { useState } from 'react'
import { newsData, updatesData, infoData } from '../assets/communityData'

const ComTabs = () => {
    const [activeTab, setActiveTab] = useState('news')

    return (
        <>
            {/* Tab Navigation */}
            <div className="bg-neutral-900 sticky top-0 z-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex -space-x-1 overflow-x-auto">
                        {[
                            { id: 'news', label: 'Latest News', count: newsData.length },
                            { id: 'updates', label: 'Updates', count: updatesData.length },
                            { id: 'info', label: 'Information', count: infoData.length }
                        ].map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`py-3 px-6 font-medium text-sm whitespace-nowrap transition-all rounded-t-lg relative ${
                                    activeTab === tab.id
                                        ? 'bg-white text-gray-900 shadow-lg z-10'
                                        : 'bg-gray-700 text-gray-300 hover:bg-gray-600 hover:text-white'
                                }`}
                            >
                                {tab.label}
                                <span className={`ml-2 py-0.5 px-2.5 rounded-full text-xs ${
                                    activeTab === tab.id
                                        ? 'bg-gray-200 text-gray-900'
                                        : 'bg-amber-200 text-gray-900'
                                }`}>
                                    {tab.count}
                                </span>
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="bg-white max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* News Tab */}
                {activeTab === 'news' && (
                    <div className="space-y-8">
                        <div className="text-center">
                            <h2 className="text-3xl font-bold text-gray-900 mb-4">Latest News</h2>
                            <p className="text-gray-600 max-w-2xl mx-auto">Stay updated with the latest features, events, and community highlights</p>
                        </div>
                        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                            {newsData.map((news) => (
                                <div key={news.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                                    <div className="relative">
                                        <img
                                            src={news.image}
                                            alt={news.title}
                                            className="w-full h-48 object-cover"
                                        />
                                        <div className="absolute top-4 left-4">
                                            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-white text-gray-800 shadow-sm">
                                                {news.category}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="p-6">
                                        <div className="flex items-center justify-between mb-3">
                                            <span className="text-sm text-gray-500">{news.date}</span>
                                            <span className="text-sm text-gray-500">{news.readTime}</span>
                                        </div>
                                        <h3 className="text-xl font-semibold text-gray-900 mb-3 line-clamp-2">{news.title}</h3>
                                        <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">{news.content}</p>
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm text-gray-500">By {news.author}</span>
                                            <button className="text-blue-600 hover:text-blue-800 font-medium text-sm flex items-center">
                                                Read More
                                                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                                </svg>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Updates Tab */}
                {activeTab === 'updates' && (
                    <div className="space-y-8">
                        <div className="text-center">
                            <h2 className="text-3xl font-bold text-gray-900 mb-4">Development Updates</h2>
                            <p className="text-gray-600 max-w-2xl mx-auto">Track our progress on new features and improvements</p>
                        </div>
                        <div className="space-y-6">
                            {updatesData.map((update) => (
                                <div key={update.id} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300">
                                    <div className="flex items-start space-x-4">
                                        <div className="text-3xl">{update.icon}</div>
                                        <div className="flex-1">
                                            <div className="flex items-center justify-between mb-4">
                                                <h3 className="text-xl font-semibold text-gray-900">{update.title}</h3>
                                                <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${update.status === 'Completed'
                                                    ? 'bg-green-100 text-green-800'
                                                    : update.status === 'In Progress'
                                                        ? 'bg-yellow-100 text-yellow-800'
                                                        : 'bg-gray-100 text-gray-800'
                                                    }`}>
                                                    {update.status}
                                                </span>
                                            </div>
                                            <p className="text-gray-600 mb-4">{update.description}</p>
                                            <div className="space-y-2">
                                                <div className="flex justify-between text-sm text-gray-500">
                                                    <span>Progress</span>
                                                    <span>{update.progress}%</span>
                                                </div>
                                                <div className="w-full bg-gray-200 rounded-full h-2">
                                                    <div
                                                        className={`h-2 rounded-full transition-all duration-500 ${update.status === 'Completed'
                                                            ? 'bg-green-500'
                                                            : update.status === 'In Progress'
                                                                ? 'bg-yellow-500'
                                                                : 'bg-gray-300'
                                                            }`}
                                                        style={{ width: `${update.progress}%` }}
                                                    ></div>
                                                </div>
                                            </div>
                                            <div className="flex items-center justify-between mt-4">
                                                <span className="text-sm text-gray-500">Updated: {update.date}</span>
                                                <button className="text-blue-600 hover:text-blue-800 font-medium text-sm flex items-center">
                                                    View Details
                                                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                                    </svg>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Information Tab */}
                {activeTab === 'info' && (
                    <div className="space-y-8">
                        <div className="text-center">
                            <h2 className="text-3xl font-bold text-gray-900 mb-4">Help & Information</h2>
                            <p className="text-gray-600 max-w-2xl mx-auto">Everything you need to know about our platform and community</p>
                        </div>
                        <div className="grid gap-6 md:grid-cols-2">
                            {infoData.map((info, index) => (
                                <div key={index} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                                    <div className="flex items-start space-x-4">
                                        <div className={`w-12 h-12 rounded-lg flex items-center justify-center text-white text-xl ${info.color}`}>
                                            {info.icon}
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="text-xl font-semibold text-gray-900 mb-3">{info.title}</h3>
                                            <p className="text-gray-600 text-sm leading-relaxed mb-4">{info.content}</p>
                                            <button className="text-blue-600 hover:text-blue-800 font-medium text-sm flex items-center">
                                                Learn More
                                                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                                </svg>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </>
    )
}

export default ComTabs