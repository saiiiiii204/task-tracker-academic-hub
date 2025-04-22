
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './AssignmentForm.module.css';

const AssignmentForm = ({ subjects = [], onSubmit, initialValues = {}, isEditing = false }) => {
  const [formData, setFormData] = useState({
    title: initialValues.title || '',
    description: initialValues.description || '',
    subject_id: initialValues.subject_id || '',
    deadline: initialValues.deadline ? new Date(initialValues.deadline).toISOString().slice(0, 16) : '',
    submission_type: initialValues.submission_type || 'file',
    priority_level: initialValues.priority_level || 2,
  });
  
  const [errors, setErrors] = useState({});
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when field is updated
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };
  
  const validate = () => {
    const newErrors = {};
    
    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }
    
    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }
    
    if (!formData.subject_id) {
      newErrors.subject_id = 'Subject is required';
    }
    
    if (!formData.deadline) {
      newErrors.deadline = 'Deadline is required';
    } else {
      const deadlineDate = new Date(formData.deadline);
      const now = new Date();
      
      if (deadlineDate <= now) {
        newErrors.deadline = 'Deadline must be in the future';
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validate()) {
      return;
    }
    
    // Format deadline to ISO string
    const formattedData = {
      ...formData,
      priority_level: Number(formData.priority_level)
    };
    
    onSubmit(formattedData);
  };
  
  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.formGroup}>
        <label htmlFor="title" className={styles.label}>Assignment Title</label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          className={styles.input}
          placeholder="Enter a clear and concise title"
        />
        {errors.title && <div className={styles.error}>{errors.title}</div>}
      </div>
      
      <div className={styles.row}>
        <div className={`${styles.formGroup} ${styles.column}`}>
          <label htmlFor="subject_id" className={styles.label}>Subject</label>
          <select
            id="subject_id"
            name="subject_id"
            value={formData.subject_id}
            onChange={handleChange}
            className={styles.select}
          >
            <option value="">Select Subject</option>
            {subjects.map(subject => (
              <option key={subject.id} value={subject.id}>
                {subject.subject_name} ({subject.subject_code})
              </option>
            ))}
          </select>
          {errors.subject_id && <div className={styles.error}>{errors.subject_id}</div>}
        </div>
        
        <div className={`${styles.formGroup} ${styles.column}`}>
          <label htmlFor="deadline" className={styles.label}>Deadline</label>
          <input
            type="datetime-local"
            id="deadline"
            name="deadline"
            value={formData.deadline}
            onChange={handleChange}
            className={styles.input}
          />
          {errors.deadline && <div className={styles.error}>{errors.deadline}</div>}
          <div className={styles.hint}>Select both date and time for the deadline</div>
        </div>
      </div>
      
      <div className={styles.row}>
        <div className={`${styles.formGroup} ${styles.column}`}>
          <label htmlFor="submission_type" className={styles.label}>Submission Type</label>
          <select
            id="submission_type"
            name="submission_type"
            value={formData.submission_type}
            onChange={handleChange}
            className={styles.select}
          >
            <option value="file">File Upload</option>
            <option value="text">Text Entry</option>
            <option value="link">External Link</option>
            <option value="mixed">Multiple Formats</option>
          </select>
        </div>
        
        <div className={`${styles.formGroup} ${styles.column}`}>
          <label htmlFor="priority_level" className={styles.label}>Priority Level</label>
          <select
            id="priority_level"
            name="priority_level"
            value={formData.priority_level}
            onChange={handleChange}
            className={styles.select}
          >
            <option value="1">Low</option>
            <option value="2">Medium</option>
            <option value="3">High</option>
          </select>
          <div className={styles.hint}>This helps students prioritize their work</div>
        </div>
      </div>
      
      <div className={styles.formGroup}>
        <label htmlFor="description" className={styles.label}>Description</label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          className={styles.textarea}
          placeholder="Provide detailed instructions for the assignment..."
        ></textarea>
        {errors.description && <div className={styles.error}>{errors.description}</div>}
      </div>
      
      <div className={styles.buttons}>
        <Link to="/assignments">
          <button type="button" className={`${styles.button} ${styles.cancelButton}`}>
            Cancel
          </button>
        </Link>
        <button type="submit" className={styles.button}>
          <span className={styles.buttonIcon}>{isEditing ? '✏️' : '➕'}</span>
          <span>{isEditing ? 'Update Assignment' : 'Create Assignment'}</span>
        </button>
      </div>
    </form>
  );
};

export default AssignmentForm;
