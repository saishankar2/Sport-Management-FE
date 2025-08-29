import React from 'react';
import FeeInsight from '../dashboard_components/fee_insights';
import AttendanceInsight from '../dashboard_components/attendance_insight';
import PerformanceInsight from '../dashboard_components/performance_insights';
import Tickets from '../dashboard_components/tickets'; // Table Tennis-specific

const Dashboard = () => {
  return (
      <div className="lg:px-20 px-5 py-10 w-full">
        <h1 className="text-3xl font-bold mb-8 text-white">Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:grid-cols-2">
          <div className="col-span-1">
            <FeeInsight />
          </div>
          <div className="col-span-1">
            <AttendanceInsight />
          </div>
          <div className="col-span-1">
            <PerformanceInsight />
          </div>
          <div className="col-span-1">
            <Tickets />
          </div>
        </div>
      </div>
  );
};

export default Dashboard;
