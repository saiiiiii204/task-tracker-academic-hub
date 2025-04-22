
import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Dashboard.module.css';

const StudentDashboard = ({ user, assignments = [], submissions = [], upcomingReminders = [] }) => {
  const pendingAssignments = assignments.filter(assignment => {
    const submission = submissions.find(sub => sub.assignment_id === assignment.id);
    return !submission || submission.submission_status === 'pending';
  });

  const stats = [
    {
      title: 'Pending Assignments',
      value: pendingAssignments.length,
      change: '+2 since last week',
      isPositive: false,
    },
    {
      title: 'Completed Assignments',
      value: submissions.filter(sub => sub.submission_status === 'submitted').length,
      change: '+5 since last week',
      isPositive: true,
    },
    {
      title: 'Upcoming Deadlines',
      value: assignments.filter(a => new Date(a.deadline) > new Date()).length,
      change: '+3 since last week',
      isPositive: true,
    },
  ];

  const getPriorityBadge = (level) => {
    switch (level) {
      case 1:
        return <span className={`${styles.badge} ${styles.badgeLow}`}>Low</span>;
      case 2:
        return <span className={`${styles.badge} ${styles.badgeMedium}`}>Medium</span>;
      case 3:
        return <span className={`${styles.badge} ${styles.badgeHigh}`}>High</span>;
      default:
        return <span className={`${styles.badge} ${styles.badgeLow}`}>Low</span>;
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const isDeadlineSoon = (deadline) => {
    const now = new Date();
    const deadlineDate = new Date(deadline);
    const diffTime = deadlineDate - now;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 2 && diffDays >= 0;
  };

  return (
    <div className={styles.dashboard}>
      <div className={styles.grid}>
        {stats.map((stat, index) => (
          <div key={index} className={styles.stat}>
            <div className={styles.statTitle}>{stat.title}</div>
            <div className={styles.statValue}>{stat.value}</div>
            <div className={`${styles.statChange} ${stat.isPositive ? styles.statChangePositive : styles.statChangeNegative}`}>
              {stat.change}
            </div>
          </div>
        ))}
      </div>

      <div className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Upcoming Assignments</h2>
          <Link to="/assignments" className={styles.viewAll}>View All</Link>
        </div>
        
        {pendingAssignments.length > 0 ? (
          <div className={styles.cards}>
            {pendingAssignments.slice(0, 3).map((assignment) => (
              <div key={assignment.id} className={styles.card}>
                <div className={styles.cardHeader}>
                  <div>
                    <h3 className={styles.cardTitle}>{assignment.title}</h3>
                    <div className={styles.cardSubject}>{assignment.subject?.subject_name || 'Unknown Subject'}</div>
                    <div className={styles.cardMeta}>
                      <span>Posted by {assignment.created_by_name || 'Class Coordinator'}</span>
                    </div>
                  </div>
                  {getPriorityBadge(assignment.priority_level)}
                </div>
                
                <div className={styles.cardContent}>
                  <p className={styles.cardDescription}>{assignment.description}</p>
                </div>
                
                <div className={styles.cardFooter}>
                  <div className={styles.cardDeadline} style={{ color: isDeadlineSoon(assignment.deadline) ? 'var(--error-color)' : 'inherit' }}>
                    Due: {formatDate(assignment.deadline)} at {formatTime(assignment.deadline)}
                  </div>
                  <div className={styles.cardActions}>
                    <Link to={`/assignments/${assignment.id}`}>
                      <button className={styles.cardAction}>👁️</button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className={styles.emptyList}>
            <div className={styles.emptyListIcon}>📝</div>
            <div className={styles.emptyListText}>No pending assignments</div>
            <p>You're all caught up! Check back later for new assignments.</p>
          </div>
        )}
      </div>

      <div className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Upcoming Reminders</h2>
          {user?.is_class_coordinator && (
            <Link to="/manage-reminders" className={styles.viewAll}>Manage Reminders</Link>
          )}
        </div>
        
        {upcomingReminders.length > 0 ? (
          <div className={styles.cards}>
            {upcomingReminders.slice(0, 3).map((reminder) => (
              <div key={reminder.id} className={styles.card}>
                <div className={styles.cardHeader}>
                  <div>
                    <h3 className={styles.cardTitle}>{reminder.assignment?.title || 'Reminder'}</h3>
                    <div className={styles.cardMeta}>
                      <span>Reminder set for {formatDate(reminder.reminder_time)} at {formatTime(reminder.reminder_time)}</span>
                    </div>
                  </div>
                </div>
                
                <div className={styles.cardContent}>
                  <p className={styles.cardDescription}>{reminder.reminder_message}</p>
                </div>
                
                <div className={styles.cardFooter}>
                  <div className={styles.cardDeadline}>
                    Assignment Due: {reminder.assignment ? formatDate(reminder.assignment.deadline) : 'Unknown'}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className={styles.emptyList}>
            <div className={styles.emptyListIcon}>⏰</div>
            <div className={styles.emptyListText}>No upcoming reminders</div>
            <p>You don't have any reminders scheduled at the moment.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentDashboard;
