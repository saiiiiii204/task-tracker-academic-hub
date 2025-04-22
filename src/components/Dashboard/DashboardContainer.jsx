
import React from 'react';
import Layout from '../Layout/Layout';
import StudentDashboard from './StudentDashboard';
import FacultyDashboard from './FacultyDashboard';

const DashboardContainer = ({ user, assignmentsData, submissionsData, remindersData, subjectsData }) => {
  return (
    <Layout 
      user={user} 
      title={`Welcome, ${user?.full_name || 'Guest'}`}
    >
      {user?.role === 'student' ? (
        <StudentDashboard 
          user={user}
          assignments={assignmentsData}
          submissions={submissionsData}
          upcomingReminders={remindersData}
        />
      ) : user?.role === 'faculty' ? (
        <FacultyDashboard
          user={user}
          subjects={subjectsData}
          assignments={assignmentsData}
          pendingSubmissions={submissionsData?.filter(s => s.submission_status === 'submitted') || []}
        />
      ) : (
        <div>
          <h2>Welcome to AssignTrack</h2>
          <p>Please log in to access the dashboard.</p>
        </div>
      )}
    </Layout>
  );
};

export default DashboardContainer;
