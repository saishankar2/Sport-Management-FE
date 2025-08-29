// dashboard_comps/InsightTabs.jsx

import React, { useState } from 'react';
import {
    ResponsiveContainer, PieChart, Pie, Cell, Tooltip,
    LineChart, Line, XAxis, YAxis, CartesianGrid, Legend,
} from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28']; // Colors for Attapur, Gachibowli, Chennai

const sampleData_line = {
    fee: [
        { name: 'Week 1', Attapur: 50, Gachibowli: 40, Chennai: 45 },
        { name: 'Week 2', Attapur: 60, Gachibowli: 45, Chennai: 50 },
        { name: 'Week 3', Attapur: 55, Gachibowli: 50, Chennai: 55 },
        { name: 'Week 4', Attapur: 70, Gachibowli: 60, Chennai: 65 },
    ],
    attendance: [
        { name: 'Week 1', Attapur: 50, Gachibowli: 40, Chennai: 45 },
        { name: 'Week 2', Attapur: 60, Gachibowli: 45, Chennai: 50 },
        { name: 'Week 3', Attapur: 55, Gachibowli: 50, Chennai: 55 },
        { name: 'Week 4', Attapur: 70, Gachibowli: 60, Chennai: 65 },
    ],
    performance: [
        { name: 'Jan', Attapur: 75, Gachibowli: 80, Chennai: 78 },
        { name: 'Feb', Attapur: 85, Gachibowli: 90, Chennai: 88 },
        { name: 'Mar', Attapur: 90, Gachibowli: 85, Chennai: 92 },
        { name: 'Apr', Attapur: 93, Gachibowli: 88, Chennai: 95 },
    ],
};

const sampleData_pie = {
    fee: [
        { name: 'Attapur', value: 400 },
        { name: 'Gachibowli', value: 300 },
        { name: 'Chennai', value: 300 },
    ],
    attendance: [
        { name: 'Attapur', value: 400 },
        { name: 'Gachibowli', value: 300 },
        { name: 'Chennai', value: 300 },
    ],
    performance: [
        { name: 'Attapur', value: 400 },
        { name: 'Gachibowli', value: 300 },
        { name: 'Chennai', value: 300 },
    ],
};

const InsightTabs = ({ type }) => {
    const [activeTab, setActiveTab] = useState('pie'); // 'pie' or 'line'

    const renderPieChart = () => (
        <ResponsiveContainer width="100%" height={250}>
        <PieChart >
            <Pie
                data={sampleData_pie[type]}
                cx="50%"
                cy="50%"
                outerRadius={80}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                dataKey="value"
            >
                {sampleData_pie[type].map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
            </Pie>
            <Tooltip />
        </PieChart>
        </ResponsiveContainer>
    );

    const renderLineChart = () => (
        <LineChart
            width={350}
            height={250}
            data={sampleData_line[type]}
            margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
        >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="Attapur" stroke={COLORS[0]} />
            <Line type="monotone" dataKey="Gachibowli" stroke={COLORS[1]} />
            <Line type="monotone" dataKey="Chennai" stroke={COLORS[2]} />
        </LineChart>
    );

    return (
        <div className="bg-white p-6 rounded-lg shadow-lg min-w-full mx-auto">
            <h2 className="text-xl font-semibold mb-4 capitalize">{type} Insight</h2>
            <div className='lg:flex'>
                <div className="flex lg:flex-col gap-3 lg:w-1/5 space-x-4 mb-6">
                    <button
                        onClick={() => setActiveTab('pie')}
                        className={`px-4 py-2 lg:w-full rounded ${activeTab === 'pie' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
                    >
                        Pie Chart
                    </button>
                    <button
                        onClick={() => setActiveTab('line')}
                        className={`px-4 py-2 rounded ${activeTab === 'line' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
                    >
                        Line Graph
                    </button>
                </div>
                <div className='lg:flex lg:items-center justify-center w-full'>
                    <div className='w-full flex justify-center'>
                        {activeTab === 'pie' ? renderPieChart() : renderLineChart()}
                    </div>
                </div>
            </div>

        </div>
    );
};

export default InsightTabs;
