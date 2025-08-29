import React, { useState, useEffect } from 'react';

// --- Helper: Icon Components (using inline SVG for simplicity) ---
const SearchIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
);

// --- Mock Data for Athletes ---
const initialAthletesData = [
    { id: 'ATH001', name: 'Alex Johnson', team: 'Track', avatar: 'A', status: 'Pending' },
    { id: 'ATH002', name: 'Maria Garcia', team: 'Swimming', avatar: 'M', status: 'Pending' },
    { id: 'ATH003', name: 'James Smith', team: 'Basketball', avatar: 'J', status: 'Pending' },
    { id: 'ATH004', name: 'Li Wei', team: 'Gymnastics', avatar: 'L', status: 'Pending' },
    { id: 'ATH005', name: 'Fatima Ahmed', team: 'Track', avatar: 'F', status: 'Pending' },
    { id: 'ATH006', name: 'David Miller', team: 'Basketball', avatar: 'D', status: 'Pending' },
    { id: 'ATH007', name: 'Chloe Dubois', team: 'Swimming', avatar: 'C', status: 'Pending' },
    { id: 'ATH008', name: 'Kenji Tanaka', team: 'Gymnastics', avatar: 'K', status: 'Pending' },
];

const mark_attendance = () => {
  const [athletes, setAthletes] = useState(initialAthletesData);
    const [searchTerm, setSearchTerm] = useState('');

    // Filter athletes based on search term
    const filteredAthletes = athletes.filter(athlete =>
        athlete.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Function to update an athlete's status
    const handleSetStatus = (athleteId, newStatus) => {
        setAthletes(prevAthletes =>
            prevAthletes.map(athlete =>
                athlete.id === athleteId ? { ...athlete, status: newStatus } : athlete
            )
        );
    };
    
    // Helper to get the right color for the status badge
    const getStatusBadge = (status) => {
        switch (status) {
            case 'Present': return 'badge-success';
            case 'Absent': return 'badge-error';
            default: return 'badge-ghost';
        }
    };

    return (
        <div className="p-4 sm:p-6 lg:p-8 bg-neutral-900 rounded-lg shadow-lg w-full">
            {/* Header */}
            <div className="mb-6">
                <h1 className="text-2xl sm:text-3xl font-bold text-white">Log Daily Attendance</h1>
                <p className="text-gray-400 mt-1">Quickly mark each athlete as present or absent for today's session.</p>
            </div>

            {/* Search Bar */}
            <div className="mb-6">
                <div className="relative flex-grow">
                    <input
                        type="text"
                        placeholder="Search for an athlete..."
                        className="input input-bordered w-full max-w-xs pl-10 bg-neutral-700 text-white"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                        <SearchIcon />
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
                            <div className="flex items-center gap-3 w-full sm:w-auto">
                                <div className="w-24 text-center">
                                     <span className={`badge ${getStatusBadge(athlete.status)}`}>{athlete.status}</span>
                                </div>
                                <div className="flex gap-2">
                                    <button 
                                        className="btn btn-sm btn-success"
                                        onClick={() => handleSetStatus(athlete.id, 'Present')}
                                        disabled={athlete.status !== 'Pending'}
                                    >
                                        Present
                                    </button>
                                    <button 
                                        className="btn btn-sm btn-error"
                                        onClick={() => handleSetStatus(athlete.id, 'Absent')}
                                        disabled={athlete.status !== 'Pending'}
                                    >
                                        Absent
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="text-center p-8 text-gray-500">
                        No athletes found matching your search.
                    </div>
                )}
            </div>
        </div>
    );
}

export default mark_attendance