
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './AssignmentList.module.css';

const AssignmentList = ({ assignments = [], subjects = [], userRole, isCoordinator = false }) => {
  const [filteredAssignments, setFilteredAssignments] = useState([]);
  const [filters, setFilters] = useState({
    subject: '',
    status: '',
    priority: '',
    search: '',
  });
  
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(9);
  
  // When assignments or filters change, update filtered assignments
  useEffect(() => {
    let result = [...assignments];
    
    // Filter by subject
    if (filters.subject) {
      result = result.filter(assignment => assignment.subject_id === filters.subject);
    }
    
    // Filter by priority
    if (filters.priority) {
      const priorityLevel = parseInt(filters.priority);
      result = result.filter(assignment => assignment.priority_level === priorityLevel);
    }
    
    // Filter by status (for students)
    if (filters.status === 'pending') {
      result = result.filter(assignment => {
        const now = new Date();
        const deadline = new Date(assignment.deadline);
        return deadline > now && !assignment.isSubmitted;
      });
    } else if (filters.status === 'submitted') {
      result = result.filter(assignment => assignment.isSubmitted);
    } else if (filters.status === 'overdue') {
      result = result.filter(assignment => {
        const now = new Date();
        const deadline = new Date(assignment.deadline);
        return deadline < now && !assignment.isSubmitted;
      });
    }
    
    // Filter by search term
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      result = result.filter(
        assignment => 
          assignment.title.toLowerCase().includes(searchTerm) || 
          assignment.description.toLowerCase().includes(searchTerm)
      );
    }
    
    setFilteredAssignments(result);
    setCurrentPage(1); // Reset to first page when filters change
  }, [assignments, filters]);
  
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };
  
  const resetFilters = () => {
    setFilters({
      subject: '',
      status: '',
      priority: '',
      search: '',
    });
  };
  
  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredAssignments.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredAssignments.length / itemsPerPage);
  
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  
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
  
  const getPriorityClass = (level) => {
    switch (level) {
      case 1:
        return styles.lowPriority;
      case 2:
        return styles.mediumPriority;
      case 3:
        return styles.highPriority;
      default:
        return '';
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
  
  const isDeadlinePassed = (deadline) => {
    const now = new Date();
    const deadlineDate = new Date(deadline);
    return deadlineDate < now;
  };
  
  return (
    <div className={styles.assignments}>
      <div className={styles.filters}>
        <div className={styles.filter}>
          <label htmlFor="search" className={styles.filterLabel}>Search Assignments</label>
          <input
            type="text"
            id="search"
            name="search"
            placeholder="Search by title or description..."
            value={filters.search}
            onChange={handleFilterChange}
            className={styles.filterInput}
          />
        </div>
        
        <div className={styles.filter}>
          <label htmlFor="subject" className={styles.filterLabel}>Subject</label>
          <select
            id="subject"
            name="subject"
            value={filters.subject}
            onChange={handleFilterChange}
            className={styles.filterSelect}
          >
            <option value="">All Subjects</option>
            {subjects.map(subject => (
              <option key={subject.id} value={subject.id}>
                {subject.subject_name}
              </option>
            ))}
          </select>
        </div>
        
        <div className={styles.filter}>
          <label htmlFor="priority" className={styles.filterLabel}>Priority</label>
          <select
            id="priority"
            name="priority"
            value={filters.priority}
            onChange={handleFilterChange}
            className={styles.filterSelect}
          >
            <option value="">All Priorities</option>
            <option value="1">Low</option>
            <option value="2">Medium</option>
            <option value="3">High</option>
          </select>
        </div>
        
        {userRole === 'student' && (
          <div className={styles.filter}>
            <label htmlFor="status" className={styles.filterLabel}>Status</label>
            <select
              id="status"
              name="status"
              value={filters.status}
              onChange={handleFilterChange}
              className={styles.filterSelect}
            >
              <option value="">All Status</option>
              <option value="pending">Pending</option>
              <option value="submitted">Submitted</option>
              <option value="overdue">Overdue</option>
            </select>
          </div>
        )}
        
        <button onClick={resetFilters} className={styles.resetFilters}>
          Reset Filters
        </button>
      </div>
      
      {currentItems.length > 0 ? (
        <>
          <div className={styles.assignmentGrid}>
            {currentItems.map(assignment => (
              <div 
                key={assignment.id} 
                className={`${styles.assignmentCard} ${getPriorityClass(assignment.priority_level)}`}
              >
                <div className={styles.cardHeader}>
                  <div>
                    <h3 className={styles.cardTitle}>{assignment.title}</h3>
                    <div className={styles.cardSubject}>
                      {subjects.find(s => s.id === assignment.subject_id)?.subject_name || 'Unknown Subject'}
                    </div>
                    <div className={styles.cardMeta}>
                      {assignment.created_by_name && (
                        <span>Posted by: {assignment.created_by_name}</span>
                      )}
                    </div>
                  </div>
                  {getPriorityBadge(assignment.priority_level)}
                </div>
                
                <div className={styles.cardContent}>
                  <p className={styles.cardDescription}>{assignment.description}</p>
                </div>
                
                <div className={styles.cardFooter}>
                  <div className={`${isDeadlineSoon(assignment.deadline) || isDeadlinePassed(assignment.deadline) ? styles.deadlineNear : ''}`}>
                    {isDeadlinePassed(assignment.deadline) ? 'Overdue: ' : 'Due: '}
                    {formatDate(assignment.deadline)} at {formatTime(assignment.deadline)}
                  </div>
                  
                  <div className={styles.cardActions}>
                    <Link to={`/assignments/${assignment.id}`}>
                      <button className={styles.cardActionButton}>👁️</button>
                    </Link>
                    
                    {userRole === 'student' && isCoordinator && (
                      <Link to={`/assignments/edit/${assignment.id}`}>
                        <button className={styles.cardActionButton}>✏️</button>
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Pagination */}
          {totalPages > 1 && (
            <div className={styles.paginationContainer}>
              <div className={styles.paginationInfo}>
                Showing {indexOfFirstItem + 1}-{Math.min(indexOfLastItem, filteredAssignments.length)} of {filteredAssignments.length} assignments
              </div>
              
              <div className={styles.paginationButtons}>
                <button 
                  onClick={() => paginate(currentPage - 1)} 
                  disabled={currentPage === 1}
                  className={styles.paginationButton}
                >
                  Previous
                </button>
                
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  let pageNum;
                  if (totalPages <= 5) {
                    pageNum = i + 1;
                  } else if (currentPage <= 3) {
                    pageNum = i + 1;
                  } else if (currentPage >= totalPages - 2) {
                    pageNum = totalPages - 4 + i;
                  } else {
                    pageNum = currentPage - 2 + i;
                  }
                  
                  return (
                    <button
                      key={pageNum}
                      onClick={() => paginate(pageNum)}
                      className={`${styles.paginationButton} ${currentPage === pageNum ? styles.paginationCurrent : ''}`}
                    >
                      {pageNum}
                    </button>
                  );
                })}
                
                <button 
                  onClick={() => paginate(currentPage + 1)} 
                  disabled={currentPage === totalPages}
                  className={styles.paginationButton}
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </>
      ) : (
        <div className={styles.emptyState}>
          <div className={styles.emptyStateIcon}>📝</div>
          <h3 className={styles.emptyStateTitle}>No assignments found</h3>
          <p className={styles.emptyStateDescription}>There are no assignments matching your filters.</p>
          
          {userRole === 'student' && isCoordinator && (
            <Link to="/create-assignment">
              <button className={`${styles.createButton} button`}>
                <span>➕</span>
                <span>Create New Assignment</span>
              </button>
            </Link>
          )}
        </div>
      )}
    </div>
  );
};

export default AssignmentList;
