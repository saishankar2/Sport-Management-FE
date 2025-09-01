import React, { useState, useEffect } from 'react';

const SearchIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
);

const FilterIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-.293.707L16 11.414V16a1 1 0 01-.293.707l-2 2A1 1 0 0113 18v-6.586l-5.707-5.707A1 1 0 017 5V4z" />
    </svg>
);

const Attendance = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filterTeam, setFilterTeam] = useState('All');
    const [athletesData, setAthletesData] = useState([]);
    
    // State for date filtering logic
    const [filterType, setFilterType] = useState('thisMonth'); // 'thisMonth', 'lastMonth', 'custom'
    const [showCustomDatePickers, setShowCustomDatePickers] = useState(false);
    
    // The definitive start and end dates that trigger the API call
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

    // Temporary states for the custom date inputs
    const [tempStartDate, setTempStartDate] = useState('');
    const [tempEndDate, setTempEndDate] = useState('');

    // Helper to get default date range (current month)
    const getCurrentMonthDateRange = () => {
        const today = new Date();
        const start = new Date(today.getFullYear(), today.getMonth(), 1);
        const end = new Date(today.getFullYear(), today.getMonth() + 1, 0);
        return { start, end };
    };

    // Set initial dates on component mount
    useEffect(() => {
        const { start, end } = getCurrentMonthDateRange();
        setStartDate(start);
        setEndDate(end);
    }, []);

    // Fetch data whenever the definitive startDate or endDate changes
    useEffect(() => {
        const fetchAttendanceData = async () => {
            if (!startDate || !endDate) return;

            const token = localStorage.getItem('token');
            if (!token) {
                console.error("No token found. Please login.");
                return;
            }

            const formattedStartDate = startDate.toISOString().split('T')[0];
            const formattedEndDate = endDate.toISOString().split('T')[0];

            try {
                const response = await fetch(`http://localhost:3000/api/attendance/overview/stats?startDate=${formattedStartDate}&endDate=${formattedEndDate}`, {
                    headers: { 'Authorization': `Bearer ${token}` },
                });

                if (response.ok) {
                    const data = await response.json();
                    setAthletesData(data.data.userStats || []);
                } else {
                    console.error('Failed to fetch attendance data');
                    setAthletesData([]); // Clear data on error
                }
            } catch (error) {
                console.error('Error fetching attendance data:', error);
                setAthletesData([]); // Clear data on error
            }
        };

        fetchAttendanceData();
    }, [startDate, endDate]);

    // Handle changes in the main filter dropdown
    const handleFilterTypeChange = (e) => {
        const newFilterType = e.target.value;
        setFilterType(newFilterType);

        if (newFilterType === 'thisMonth') {
            const { start, end } = getCurrentMonthDateRange();
            setStartDate(start);
            setEndDate(end);
            setShowCustomDatePickers(false);
        } else if (newFilterType === 'lastMonth') {
            const today = new Date();
            const start = new Date(today.getFullYear(), today.getMonth() - 1, 1);
            const end = new Date(today.getFullYear(), today.getMonth(), 0);
            setStartDate(start);
            setEndDate(end);
            setShowCustomDatePickers(false);
        } else if (newFilterType === 'custom') {
            setShowCustomDatePickers(true);
            // Set temp dates to current view if available, otherwise empty
            setTempStartDate(startDate ? startDate.toISOString().split('T')[0] : '');
            setTempEndDate(endDate ? endDate.toISOString().split('T')[0] : '');
        }
    };

    // Handle applying the custom date range
    const handleApplyCustomDate = () => {
        if (tempStartDate && tempEndDate) {
            const newStartDate = new Date(tempStartDate);
            const newEndDate = new Date(tempEndDate);

            if (isNaN(newStartDate) || isNaN(newEndDate)) {
                 alert("Invalid date format. Please select valid dates.");
                 return;
            }
            if (newEndDate < newStartDate) {
                alert("End date cannot be before the start date.");
                return;
            }
            
            setStartDate(newStartDate);
            setEndDate(newEndDate);
        } else {
            alert("Please select both a start and end date. Defaulting to current month.");
            const { start, end } = getCurrentMonthDateRange();
            setStartDate(start);
            setEndDate(end);
            setFilterType('thisMonth');
            setShowCustomDatePickers(false);
        }
    };

    const teams = ['All', ...new Set(athletesData.map(athlete => athlete.user.role))];

    const filteredAthletes = athletesData.filter(athlete => {
        const nameMatch = `${athlete.user.firstName} ${athlete.user.lastName}`.toLowerCase().includes(searchTerm.toLowerCase());
        const teamMatch = filterTeam === 'All' || athlete.user.role === filterTeam;
        return nameMatch && teamMatch;
    });

    const getProgressColor = (percentage) => {
        if (percentage >= 90) return 'progress-success'; // Green
        if (percentage >= 70) return 'progress-warning'; // Yellow
        return 'progress-error'; // Red
    };

    return (
        <div className="py-10 px-7 sm:p-6 lg:py-15 lg:px-20 bg-neutral-900 rounded-lg shadow-lg w-full ">
            {/* Header */}
            <div className="mb-6">
                <h1 className="text-2xl sm:text-3xl font-bold text-white">Attendance Overview</h1>
                <p className="text-gray-400 mt-1">Review athlete attendance for a selected period.</p>
            </div>

            {/* Filters and Search Bar */}
            <div className="flex flex-col md:flex-row md:flex-wrap gap-4 mb-8 items-center md:items-end">
                <div className="relative w-full md:flex-grow">
                    <input
                        type="text"
                        placeholder="Search by athlete name..."
                        className="input input-bordered w-full pl-10 bg-neutral-700 text-white"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                        <SearchIcon />
                    </span>
                </div>
                 <div className="relative w-full md:w-auto">
                     <select
                        className="select select-bordered w-full md:w-auto pl-10 bg-neutral-700 text-white"
                        value={filterTeam}
                        onChange={(e) => setFilterTeam(e.target.value)}
                    >
                        {teams.map(team => (
                            <option key={team} value={team}>{team}</option>
                        ))}
                    </select>
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400 pointer-events-none">
                        <FilterIcon />
                    </span>
                </div>
                <div className="relative w-full md:w-auto">
                    <select
                        className="select select-bordered w-full md:w-auto bg-neutral-700 text-white"
                        value={filterType}
                        onChange={handleFilterTypeChange}
                    >
                        <option value="thisMonth">This Month</option>
                        <option value="lastMonth">Last Month</option>
                        <option value="custom">Custom Range</option>
                    </select>
                </div>
                {showCustomDatePickers && (
                    <div className="flex flex-col sm:flex-row w-full md:w-auto gap-4 items-center sm:items-end">
                        <div className="relative w-full sm:w-auto">
                            <input
                                type="date"
                                className="input input-bordered w-full bg-neutral-700 text-white"
                                value={tempStartDate}
                                onChange={(e) => setTempStartDate(e.target.value)}
                            />
                        </div>
                        <div className="relative w-full sm:w-auto">
                            <input
                                type="date"
                                className="input input-bordered w-full bg-neutral-700 text-white"
                                value={tempEndDate}
                                onChange={(e) => setTempEndDate(e.target.value)}
                            />
                        </div>
                        <button onClick={handleApplyCustomDate} className="btn btn-primary w-full sm:w-auto">Apply</button>
                    </div>
                )}
            </div>

            {/* Attendance Data Display */}
            <div>
                {/* Desktop Table View */}
                <div className="hidden md:block overflow-x-auto overflow-y-auto lg:h-160 rounded-lg">
                    <table className="table w-full">
                        <thead className="bg-neutral-900 text-white">
                            <tr>
                                <th className="p-4">Athlete Name</th>
                                <th className="p-4">Athlete ID</th>
                                <th className="p-4">Role</th>
                                <th className="p-4 text-center">Attendance (%)</th>
                            </tr>
                        </thead>
                        <tbody className="bg-neutral-700 text-gray-300">
                            {filteredAthletes.length > 0 ? (
                                filteredAthletes.map((athlete) => (
                                    <tr key={athlete.user._id} className="hover:bg-neutral-600 transition-colors duration-200">
                                        <td className="p-4">
                                            <div className="flex items-center space-x-3">
                                                <div className="avatar placeholder">
                                                    <div className="bg-blue-600 text-neutral-content rounded-full w-10">
                                                        <span>{athlete.user.firstName.charAt(0)}</span>
                                                    </div>
                                                </div>
                                                <div>
                                                    <div className="font-bold text-white">{`${athlete.user.firstName} ${athlete.user.lastName}`}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="p-4 font-mono text-sm">{athlete.user._id}</td>
                                        <td className="p-4"><span className="badge badge-ghost badge-sm">{athlete.user.role}</span></td>
                                        <td className="p-4">
                                            <div className="flex items-center justify-center gap-3">
                                                <progress className={`progress ${getProgressColor(athlete.presentPercentage)} w-40`} value={athlete.presentPercentage} max="100"></progress>
                                                <span className="font-bold text-white w-10 text-right">{athlete.presentPercentage}%</span>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr><td colSpan="4" className="text-center p-8 text-gray-400">No athletes found for the selected period.</td></tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Mobile Card View */}
                <div className="md:hidden grid grid-cols-1 gap-4">
                    {filteredAthletes.length > 0 ? (
                        filteredAthletes.map(athlete => (
                            <div key={athlete.user._id} className="bg-neutral-700 rounded-lg p-4 shadow-md space-y-4">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-3">
                                        <div className="avatar placeholder">
                                            <div className="bg-blue-600 text-neutral-content rounded-full w-10">
                                                <span>{athlete.user.firstName.charAt(0)}</span>
                                            </div>
                                        </div>
                                        <div>
                                            <div className="font-bold text-white">{`${athlete.user.firstName} ${athlete.user.lastName}`}</div>
                                            <div className="text-sm text-gray-400 font-mono">{athlete.user._id}</div>
                                        </div>
                                    </div>
                                    <span className="badge badge-ghost badge-sm">{athlete.user.role}</span>
                                </div>
                                <div>
                                    <div className="flex items-center justify-between text-sm mb-1">
                                        <span className="text-gray-400">Attendance</span>
                                        <span className="font-bold text-white">{athlete.presentPercentage}%</span>
                                    </div>
                                    <progress className={`progress ${getProgressColor(athlete.presentPercentage)} w-full`} value={athlete.presentPercentage} max="100"></progress>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="text-center p-8 text-gray-400">No athletes found for the selected period.</div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Attendance;

