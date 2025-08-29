import React, { useState } from 'react'

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
// --- Mock Data for Athletes ---
// In a real application, this data would likely come from an API.
const athletesData = [
    { id: 'ATH001', name: 'Alex Johnson', team: 'Track', attendance: 95, avatar: 'A' },
    { id: 'ATH002', name: 'Maria Garcia', team: 'Swimming', attendance: 88, avatar: 'M' },
    { id: 'ATH003', name: 'James Smith', team: 'Basketball', attendance: 100, avatar: 'J' },
    { id: 'ATH004', name: 'Li Wei', team: 'Gymnastics', attendance: 75, avatar: 'L' },
    { id: 'ATH005', name: 'Fatima Ahmed', team: 'Track', attendance: 62, avatar: 'F' },
    { id: 'ATH006', name: 'David Miller', team: 'Basketball', attendance: 91, avatar: 'D' },
    { id: 'ATH007', name: 'Chloe Dubois', team: 'Swimming', attendance: 45, avatar: 'C' },
    { id: 'ATH008', name: 'Kenji Tanaka', team: 'Gymnastics', attendance: 98, avatar: 'K' },
    { id: 'ATH009', name: 'Sofia Rossi', team: 'Track', attendance: 80, avatar: 'S' },
    { id: 'ATH010', name: 'Ben Carter', team: 'Basketball', attendance: 55, avatar: 'B' },
]

const attendance = () => {

    const [searchTerm, setSearchTerm] = useState('');
    const [filterTeam, setFilterTeam] = useState('All');

    // Get a list of unique teams for the filter dropdown
    const teams = ['All', ...new Set(athletesData.map(athlete => athlete.team))];

    // Filter athletes based on search term and team filter
    const filteredAthletes = athletesData.filter(athlete => {
        const nameMatch = athlete.name.toLowerCase().includes(searchTerm.toLowerCase());
        const teamMatch = filterTeam === 'All' || athlete.team === filterTeam;
        return nameMatch && teamMatch;
    });

    // Helper function to determine progress bar color based on attendance percentage
    const getProgressColor = (percentage) => {
        if (percentage >= 90) return 'progress-success'; // Green
        if (percentage >= 70) return 'progress-warning'; // Yellow
        return 'progress-error'; // Red
    };

  return (
     <div className="py-10 px-7 sm:p-6 lg:py-15 lg:px-20 bg-neutral-900 rounded-lg shadow-lg w-full ">
            {/* Header */}
            <div className="mb-6">
                <h1 className="text-2xl sm:text-3xl font-bold text-white">Monthly Attendance</h1>
                <p className="text-gray-400 mt-1">Review and manage athlete attendance for the current month.</p>
            </div>

            {/* Filters and Search Bar */}
            <div className="flex flex-col md:flex-row gap-4 mb-6">
                <div className="relative flex-grow">
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
                <div className="relative">
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
                                <th className="p-4">Team</th>
                                <th className="p-4 text-center">Attendance (%)</th>
                            </tr>
                        </thead>
                        <tbody className="bg-neutral-700 text-gray-300">
                            {filteredAthletes.length > 0 ? (
                                filteredAthletes.map((athlete) => (
                                    <tr key={athlete.id} className="hover:bg-neutral-600 transition-colors duration-200">
                                        <td className="p-4">
                                            <div className="flex items-center space-x-3">
                                                <div className="avatar placeholder">
                                                    <div className="bg-blue-600 text-neutral-content rounded-full w-10">
                                                        <span>{athlete.avatar}</span>
                                                    </div>
                                                </div>
                                                <div>
                                                    <div className="font-bold text-white">{athlete.name}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="p-4 font-mono text-sm">{athlete.id}</td>
                                        <td className="p-4"><span className="badge badge-ghost badge-sm">{athlete.team}</span></td>
                                        <td className="p-4">
                                            <div className="flex items-center justify-center gap-3">
                                                <progress className={`progress ${getProgressColor(athlete.attendance)} w-40`} value={athlete.attendance} max="100"></progress>
                                                <span className="font-bold text-white w-10 text-right">{athlete.attendance}%</span>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr><td colSpan="4" className="text-center p-8 text-gray-400">No athletes found.</td></tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Mobile Card View */}
                <div className="md:hidden grid grid-cols-1 gap-4">
                    {filteredAthletes.length > 0 ? (
                        filteredAthletes.map(athlete => (
                            <div key={athlete.id} className="bg-neutral-700 rounded-lg p-4 shadow-md space-y-4">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-3">
                                        <div className="avatar placeholder">
                                            <div className="bg-blue-600 text-neutral-content rounded-full w-10">
                                                <span>{athlete.avatar}</span>
                                            </div>
                                        </div>
                                        <div>
                                            <div className="font-bold text-white">{athlete.name}</div>
                                            <div className="text-sm text-gray-400 font-mono">{athlete.id}</div>
                                        </div>
                                    </div>
                                    <span className="badge badge-ghost badge-sm">{athlete.team}</span>
                                </div>
                                <div>
                                    <div className="flex items-center justify-between text-sm mb-1">
                                        <span className="text-gray-400">Attendance</span>
                                        <span className="font-bold text-white">{athlete.attendance}%</span>
                                    </div>
                                    <progress className={`progress ${getProgressColor(athlete.attendance)} w-full`} value={athlete.attendance} max="100"></progress>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="text-center p-8 text-gray-400">No athletes found.</div>
                    )}
                </div>
            </div>
        </div>
  )
}

export default attendance