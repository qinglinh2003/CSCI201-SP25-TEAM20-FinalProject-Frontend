import React, { useState, useEffect } from 'react';
import styles from '../features/course_page/CoursePage.module.css';

export const AssignmentForm = ({ assignment, onSubmit, onCancel, isAddingNew = false }) => {
  const [formData, setFormData] = useState({
    name: '',
    dueDate: '',
    description: ''
  });

  // Update form data when assignment prop changes
  useEffect(() => {
    if (assignment) {
      setFormData({
        name: assignment.name || '',
        dueDate: assignment.dueDate || '',
        description: assignment.description || ''
      });
    }
  }, [assignment]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form className={styles.assignmentForm} onSubmit={handleSubmit}>
      <h2>{isAddingNew ? 'Add New Assignment' : 'Edit Assignment'}</h2>
      
      <div className={styles.formGroup}>
        <label htmlFor="name">Assignment Name</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>
      
      <div className={styles.formGroup}>
        <label htmlFor="dueDate">Due Date</label>
        <input
          type="text"
          id="dueDate"
          name="dueDate"
          value={formData.dueDate}
          onChange={handleChange}
          required
        />
      </div>
      
      <div className={styles.formGroup}>
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows="3"
        />
      </div>
      
      <div className={styles.formActions}>
        <button type="button" className={styles.cancelButton} onClick={onCancel}>
          Cancel
        </button>
        <button type="submit" className={styles.submitButton}>
          {isAddingNew ? 'Add Assignment' : 'Save Changes'}
        </button>
      </div>
    </form>
  );
};