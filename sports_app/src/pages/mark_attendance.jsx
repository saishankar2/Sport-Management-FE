import React, { useState, useEffect } from 'react';

// --- Helper: Icon Components (using inline SVG for simplicity) ---
const SearchIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
);

const Notification = ({ message, type, onDismiss }) => {
    if (!message) return null;

    const baseClasses = "p-4 rounded-md text-white fixed top-20 right-5 z-50 shadow-lg";
    const typeClasses = type === 'success' ? 'bg-green-500' : 'bg-red-500';

    useEffect(() => {
        const timer = setTimeout(() => {
            onDismiss();
        }, 3000);
        return () => clearTimeout(timer);
    }, [message, onDismiss]);

    return (
        <div className={`${baseClasses} ${typeClasses}`}>
            {message}
        </div>
    );
};


const MarkAttendance = () => {
    const [athletes, setAthletes] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true);
    const [notification, setNotification] = useState({ message: '', type: '' });
    // The date is now fixed to today
    const today = new Date().toISOString().split('T')[0];

    const showNotification = (message, type) => {
        setNotification({ message, type });
    };

    useEffect(() => {
        const fetchAthletes = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                showNotification("No token found. Please login.", "error");
                setLoading(false);
                return;
            }

            try {
                const response = await fetch('http://localhost:3000/api/user/get-users', {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    // Transform the fetched user data to match the component's expected format
                    const formattedAthletes = data.data.map(user => ({
                        id: user._id,
                        name: `${user.firstName} ${user.lastName}`,
                        team: user.role,
                        avatar: user.firstName.charAt(0).toUpperCase(),
                        status: 'Pending',
                    }));
                    setAthletes(formattedAthletes);
                } else {
                    console.error('Failed to fetch users');
                    showNotification('Failed to load athlete data.', 'error');
                }
            } catch (error) {
                console.error('Error fetching users:', error);
                showNotification('An error occurred while fetching athlete data.', 'error');
            } finally {
                setLoading(false);
            }
        };

        fetchAthletes();
    }, []);

    // Filter athletes based on search term
    const filteredAthletes = athletes.filter(athlete =>
        athlete.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Function to update an athlete's status by calling the API
    const handleSetStatus = async (athleteId, newStatus) => {
        const token = localStorage.getItem('token');
        if (!token) {
            showNotification("No token found. Please login.", "error");
            return;
        }

        const payload = {
            userId: athleteId,
            date: today, // Always use today's date
            status: newStatus.toLowerCase(),
            notes: newStatus,
        };

        try {
            const response = await fetch('http://localhost:3000/api/attendance/mark', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(payload),
            });

            if (response.ok) {
                // If API call is successful, update the UI
                setAthletes(prevAthletes =>
                    prevAthletes.map(athlete =>
                        athlete.id === athleteId ? { ...athlete, status: newStatus } : athlete
                    )
                );
                showNotification('Attendance marked successfully!', 'success');
            } else {
                let errorMessage = `HTTP error! Status: ${response.status}`;
                try {
                    const errorData = await response.json();
                    errorMessage = errorData.message || 'An unknown error occurred.';
                } catch (jsonError) {
                    console.error('Could not parse error response as JSON.');
                }
                console.error('Failed to mark attendance:', errorMessage);
                showNotification(`Error: ${errorMessage}`, 'error');
            }
        } catch (error) {
            console.error('Error marking attendance:', error);
            showNotification('An error occurred while marking attendance.', 'error');
        }
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
            <Notification 
                message={notification.message} 
                type={notification.type} 
                onDismiss={() => setNotification({ message: '', type: '' })} 
            />
            {/* Header */}
            <div className="mb-6">
                <h1 className="text-2xl sm:text-3xl font-bold text-white">Log Daily Attendance</h1>
                <p className="text-gray-400 mt-1">Quickly mark each athlete as present or absent for today's session.</p>
            </div>

            {/* Search Bar */}
            <div className="flex flex-col md:flex-row gap-4 mb-6">
                <div className="relative flex-grow">
                    <input
                        type="text"
                        placeholder="Search for an athlete..."
                        className="input input-bordered w-full pl-10 bg-neutral-700 text-white"
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
                {loading ? (
                    <div className="text-center p-8 text-gray-500">Loading athletes...</div>
                ) : filteredAthletes.length > 0 ? (
                    filteredAthletes.map((athlete) => (
                        <div key={athlete.id} className="bg-neutral-800 p-4 rounded-lg flex flex-col sm:flex-row items-center justify-between gap-4">
                            {/* Athlete Info */}
                            <div className="flex items-center gap-4 w-full sm:w-auto">
                                <div className="avatar placeholder">
                                    <div className="bg-blue-600 text-neutral-content rounded-full w-12 h-12 flex items-center justify-center flex-shrink-0">
                                        <span className="text-xl">{athlete.avatar}</span>
                                    </div>
                                </div>
                                <div className="min-w-0">
                                    <div className="font-bold text-white truncate">{athlete.name}</div>
                                    <div className="text-sm text-gray-400">{athlete.team}</div>
                                </div>
                            </div>
                            
                            {/* Status and Actions */}
                            <div className="flex items-center justify-center sm:justify-end gap-x-4 gap-y-2 w-full sm:w-auto flex-wrap">
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
                        No athletes found.
                    </div>
                )}
            </div>
        </div>
    );
};

export default MarkAttendance;

