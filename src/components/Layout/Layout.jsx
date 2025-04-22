
import React, { useState } from 'react';
import Sidebar from '../Sidebar/Sidebar';
import styles from './Layout.module.css';

const Layout = ({ user, children, title, actions }) => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <div className={styles.layout}>
      <Sidebar 
        user={user} 
        collapsed={sidebarCollapsed} 
        onToggle={toggleSidebar}
        mobileOpen={mobileMenuOpen}
      />
      
      <main className={`${styles.main} ${sidebarCollapsed ? styles.mainCollapsed : ''}`}>
        <div className={styles.header}>
          <div className={styles.headerRow}>
            <button className={styles.mobileMenuButton} onClick={toggleMobileMenu}>
              ☰
            </button>
            {title && <h1 className={styles.pageTitle}>{title}</h1>}
          </div>
          
          {actions && <div className={styles.actions}>{actions}</div>}
        </div>
        
        <div className={styles.content}>
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;
