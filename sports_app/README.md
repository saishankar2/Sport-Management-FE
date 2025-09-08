Sport Management Frontend
This is the official frontend application for the Sport Management platform. It provides a user-friendly interface for athletes and administrators to interact with the backend services, including managing profiles, tracking attendance, and handling fees.

Key Features
User Dashboard: A personalized dashboard for athletes to view their stats and upcoming events.

Admin Panel: A comprehensive interface for administrators to manage users, track attendance, and oversee fee payments.

Authentication: Secure login and registration forms with JWT token handling for session management.

Profile Management: Allows users to view and update their personal information.

Attendance Tracking: Visual calendars and reports for viewing weekly, monthly, and yearly attendance records.

Fee Management: Interface for users to view their fee status and for admins to record payments.

Responsive Design: A clean, modern UI that works seamlessly across desktops, tablets, and mobile devices.

Prerequisites
Node.js (v14 or higher)

npm or yarn

A running instance of the Sport Management Backend API.

Installation
Clone the repository

git clone <repository-url>
cd sport-management-fe

Install dependencies

npm install

Environment Configuration

Create a .env file in the root of the project. This file will tell your frontend application where to find the backend API.

Add the following environment variable:

# The URL of your running backend server
REACT_APP_API_URL=http://localhost:3000/api

Note: The variable name REACT_APP_API_URL is a convention for Create React App. If you are using a different framework like Vue or Angular, you may need to use a different name (e.g., VITE_API_URL or NG_APP_API_URL).

Run the application

# This will start the development server
npm start

The application should now be running on http://localhost:3001 (or another port specified by your development server).

Project Structure
A typical structure for a modern frontend application might look like this:

.
├── public/
│   ├── index.html
│   └── favicon.ico
├── src/
│   ├── assets/         # Images, fonts, and other static files
│   ├── components/     # Reusable UI components (buttons, forms, etc.)
│   ├── contexts/       # React contexts for state management (e.g., AuthContext)
│   ├── hooks/          # Custom React hooks
│   ├── pages/          # Main page components (Dashboard, Login, etc.)
│   ├── services/       # API call functions (e.g., authService.js)
│   ├── styles/         # Global styles and CSS files
│   ├── utils/          # Utility functions
│   ├── App.js          # Main application component
│   └── index.js        # Entry point of the application
├── .env                # Environment variables
├── package.json
└── README.md

Connecting to the Backend
For the frontend application to function correctly, it must be able to communicate with the backend API.

API Base URL: All API requests are configured to use the REACT_APP_API_URL from your .env file.

Authentication: Upon successful login, the JWT token received from the backend is stored securely (e.g., in localStorage or sessionStorage). This token is then included in the Authorization header for all subsequent requests to protected endpoints.

CORS: The backend is configured with CORS (Cross-Origin Resource Sharing) to allow requests from the frontend's domain (e.g., http://localhost:3001).
