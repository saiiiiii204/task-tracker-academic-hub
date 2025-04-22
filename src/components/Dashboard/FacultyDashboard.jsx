
import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Dashboard.module.css';

const FacultyDashboard = ({ user, subjects = [], assignments = [], pendingSubmissions = [] }) => {
  const stats = [
    {
      title: 'Subjects',
      value: subjects.length,
      change: 'Total subjects you teach',
      isPositive: true,
    },
    {
      title: 'Active Assignments',
      value: assignments.filter(a => new Date(a.deadline) > new Date()).length,
      change: 'Currently ongoing',
      isPositive: true,
    },
    {
      title: 'Pending Reviews',
      value: pendingSubmissions.length,
      change: 'Submissions waiting for review',
      isPositive: pendingSubmissions.length === 0,
    },
  ];

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
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
          <h2 className={styles.sectionTitle}>Your Subjects</h2>
          <Link to="/subjects" className={styles.viewAll}>View All</Link>
        </div>
        
        {subjects.length > 0 ? (
          <div className={styles.cards}>
            {subjects.slice(0, 3).map((subject) => (
              <div key={subject.id} className={styles.card}>
                <div className={styles.cardHeader}>
                  <div>
                    <h3 className={styles.cardTitle}>{subject.subject_name}</h3>
                    <div className={styles.cardSubject}>Code: {subject.subject_code}</div>
                    <div className={styles.cardMeta}>
                      <span>{subject.class?.class_name || 'Unknown Class'} - {subject.class?.section || 'Section'}</span>
                    </div>
                  </div>
                </div>
                
                <div className={styles.cardFooter}>
                  <div className={styles.cardDeadline}>
                    {subject.assignments?.length || 0} active assignments
                  </div>
                  <div className={styles.cardActions}>
                    <Link to={`/subjects/${subject.id}`}>
                      <button className={styles.cardAction}>👁️</button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className={styles.emptyList}>
            <div className={styles.emptyListIcon}>📚</div>
            <div className={styles.emptyListText}>No subjects assigned</div>
            <p>You don't have any subjects assigned to you yet.</p>
          </div>
        )}
      </div>

      <div className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Submissions Needing Review</h2>
          <Link to="/review-submissions" className={styles.viewAll}>View All</Link>
        </div>
        
        {pendingSubmissions.length > 0 ? (
          <div className={styles.cards}>
            {pendingSubmissions.slice(0, 3).map((submission) => (
              <div key={submission.id} className={styles.card}>
                <div className={styles.cardHeader}>
                  <div>
                    <h3 className={styles.cardTitle}>{submission.assignment?.title || 'Assignment Submission'}</h3>
                    <div className={styles.cardSubject}>
                      {submission.assignment?.subject?.subject_name || 'Unknown Subject'}
                    </div>
                    <div className={styles.cardMeta}>
                      <span>Submitted by: {submission.student?.full_name || 'Unknown Student'}</span>
                    </div>
                  </div>
                </div>
                
                <div className={styles.cardContent}>
                  <p className={styles.cardDescription}>
                    Submitted on {formatDate(submission.submitted_at)}
                  </p>
                </div>
                
                <div className={styles.cardFooter}>
                  <div className={styles.cardDeadline}>
                    Status: {submission.submission_status}
                  </div>
                  <div className={styles.cardActions}>
                    <Link to={`/review-submissions/${submission.id}`}>
                      <button className={styles.cardAction}>✅</button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className={styles.emptyList}>
            <div className={styles.emptyListIcon}>✅</div>
            <div className={styles.emptyListText}>No pending submissions</div>
            <p>All submissions have been reviewed. Great job!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FacultyDashboard;
