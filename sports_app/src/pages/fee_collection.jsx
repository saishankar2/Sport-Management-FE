import React, { useState } from 'react';

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

// --- Mock Data for Athletes with Fee Status ---
const initialAthletesData = [
    { id: 'ATH001', name: 'Alex Johnson', team: 'Track', avatar: 'A', feeStatus: 'Paid' },
    { id: 'ATH002', name: 'Maria Garcia', team: 'Swimming', avatar: 'M', feeStatus: 'Pending' },
    { id: 'ATH003', name: 'James Smith', team: 'Basketball', avatar: 'J', feeStatus: 'Paid' },
    { id: 'ATH004', name: 'Li Wei', team: 'Gymnastics', avatar: 'L', feeStatus: 'Overdue' },
    { id: 'ATH005', name: 'Fatima Ahmed', team: 'Track', avatar: 'F', feeStatus: 'Pending' },
    { id: 'ATH006', name: 'David Miller', team: 'Basketball', avatar: 'D', feeStatus: 'Paid' },
    { id: 'ATH007', name: 'Chloe Dubois', team: 'Swimming', avatar: 'C', feeStatus: 'Overdue' },
    { id: 'ATH008', name: 'Kenji Tanaka', team: 'Gymnastics', avatar: 'K', feeStatus: 'Pending' },
];

const fee_collection = () => {
const [athletes, setAthletes] = useState(initialAthletesData);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('All');

    // Filter athletes based on search and status filter
    const filteredAthletes = athletes.filter(athlete => {
        const nameMatch = athlete.name.toLowerCase().includes(searchTerm.toLowerCase());
        const statusMatch = filterStatus === 'All' || athlete.feeStatus === filterStatus;
        return nameMatch && statusMatch;
    });

    // Function to update an athlete's fee status to 'Paid'
    const handleMarkAsPaid = (athleteId) => {
        setAthletes(prevAthletes =>
            prevAthletes.map(athlete =>
                athlete.id === athleteId ? { ...athlete, feeStatus: 'Paid' } : athlete
            )
        );
    };
    
    // Helper to get the right color for the status badge
    const getStatusBadge = (status) => {
        switch (status) {
            case 'Paid': return 'badge-success';
            case 'Pending': return 'badge-warning';
            case 'Overdue': return 'badge-error';
            default: return 'badge-ghost';
        }
    };
    
    const feeStatuses = ['All', 'Paid', 'Pending', 'Overdue'];

    return (
        <div className="p-4 sm:p-6 lg:p-8 bg-neutral-900 rounded-lg shadow-lg w-full">
            {/* Header */}
            <div className="mb-6">
                <h1 className="text-2xl sm:text-3xl font-bold text-white">Fee Collection Status</h1>
                <p className="text-gray-400 mt-1">Review and manage monthly fee payments for each athlete.</p>
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
                        value={filterStatus}
                        onChange={(e) => setFilterStatus(e.target.value)}
                    >
                        {feeStatuses.map(status => (
                            <option key={status} value={status}>{status}</option>
                        ))}
                    </select>
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400 pointer-events-none">
                        <FilterIcon />
                    </span>
                </div>
            </div>


            {/* Athletes List */}
            <div className="space-y-3">
                {filteredAthletes.length > 0 ? (
                    filteredAthletes.map((athlete) => (
                        <div key={athlete.id} className="bg-neutral-800 p-4 rounded-lg flex flex-col sm:flex-row items-center justify-between gap-4">
                            {/* Athlete Info */}
                            <div className="flex items-center gap-4 w-full sm:w-auto">
                                <div className="avatar placeholder">
                                    <div className="bg-blue-600 text-neutral-content rounded-full w-12">
                                        <span className="text-xl">{athlete.avatar}</span>
                                    </div>
                                </div>
                                <div>
                                    <div className="font-bold text-white">{athlete.name}</div>
                                    <div className="text-sm text-gray-400">{athlete.team}</div>
                                </div>
                            </div>
                            
                            {/* Status and Actions */}
                            <div className="flex items-center gap-4 w-full sm:w-auto sm:justify-end">
                                <div className="w-24 text-center">
                                     <span className={`badge ${getStatusBadge(athlete.feeStatus)}`}>{athlete.feeStatus}</span>
                                </div>
                                <div className="w-32 text-center">
                                    {athlete.feeStatus !== 'Paid' ? (
                                        <button 
                                            className="btn btn-sm btn-outline btn-success"
                                            onClick={() => handleMarkAsPaid(athlete.id)}
                                        >
                                            Mark as Paid
                                        </button>
                                    ) : (
                                        <span className="text-sm text-gray-500">-</span>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="text-center p-8 text-gray-500">
                        No athletes found with the selected criteria.
                    </div>
                )}
            </div>
        </div>
    );
};


export default fee_collection