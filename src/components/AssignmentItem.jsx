import React from 'react';
import styles from '../features/course_page/CoursePage.module.css';

export const AssignmentItem = ({ name, dueDate, description, onEdit, onRemove }) => {
  return (
    <div className={styles.assignment}>
      <label className={styles.assignmentLabel}>
        <input type="checkbox" className={styles.assignmentCheckbox} />
        <div className={styles.assignmentName}>
          {name}
        </div>
        <div className={styles.assignmentActions}>
          <button 
            className={styles.editButton} 
            onClick={() => onEdit({ name, dueDate, description })}
          >
            Edit
          </button>
          <button 
            className={styles.removeButton} 
            onClick={() => onRemove({ name })}
          >
            Remove
          </button>
        </div>
      </label>
      <ul className={styles.detail}>
        <li>Due {dueDate}</li>
        <li>Description: {description}</li>
      </ul>
    </div>
  );
};