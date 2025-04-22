
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from './Sidebar.module.css';

const Sidebar = ({ user }) => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  // Menu items based on user role
  const getMenuItems = () => {
    const commonItems = [
      { path: '/', label: 'Dashboard', icon: '📊' },
      { path: '/profile', label: 'Profile', icon: '👤' },
    ];

    if (user?.role === 'student') {
      if (user?.is_class_coordinator) {
        return [
          ...commonItems,
          { path: '/assignments', label: 'Assignments', icon: '📝' },
          { path: '/create-assignment', label: 'Create Assignment', icon: '➕' },
          { path: '/manage-reminders', label: 'Reminders', icon: '⏰' },
          { path: '/submissions', label: 'My Submissions', icon: '📤' },
        ];
      } else {
        return [
          ...commonItems,
          { path: '/assignments', label: 'Assignments', icon: '📝' },
          { path: '/submissions', label: 'My Submissions', icon: '📤' },
        ];
      }
    } else if (user?.role === 'faculty') {
      return [
        ...commonItems,
        { path: '/subjects', label: 'My Subjects', icon: '📚' },
        { path: '/assignments', label: 'Assignments', icon: '📝' },
        { path: '/review-submissions', label: 'Review Submissions', icon: '✅' },
        { path: '/analytics', label: 'Analytics', icon: '📈' },
      ];
    }

    // Default menu for non-authenticated users
    return [
      { path: '/login', label: 'Login', icon: '🔑' },
      { path: '/register', label: 'Register', icon: '📝' },
    ];
  };

  const menuItems = getMenuItems();

  // Get user initials for profile image
  const getUserInitials = () => {
    if (!user || !user.full_name) return 'U';
    return user.full_name
      .split(' ')
      .map(name => name[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  return (
    <div className={`${styles.sidebar} ${collapsed ? styles.collapsed : ''}`}>
      <div className={styles.sidebarContent}>
        <div className={styles.logo}>
          <span className={styles.logoIcon}>📚</span>
          <span className={styles.logoText}>AssignTrack</span>
          <button className={styles.collapse} onClick={toggleSidebar}>
            {collapsed ? '→' : '←'}
          </button>
        </div>

        <nav className={styles.menu}>
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`${styles.menuItem} ${
                location.pathname === item.path ? styles.active : ''
              }`}
            >
              <span className={styles.menuIcon}>{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>

        {user && (
          <div className={styles.profile}>
            <div className={styles.profileImage}>
              {getUserInitials()}
            </div>
            <div className={styles.profileInfo}>
              <div className={styles.profileName}>{user.full_name}</div>
              <div className={styles.profileRole}>
                {user.role === 'student' && user.is_class_coordinator 
                  ? 'Class Coordinator'
                  : user.role === 'student'
                  ? 'Student'
                  : 'Faculty'}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
