import React from 'react';
import styles from '../features/course_page/CoursePage.module.css';

export const AssignmentItem = ({ name, dueDate, description }) => {
  return (
    <div className={styles.assignment}>
      <label className={styles.assignmentLabel}>
        <input type="checkbox" className={styles.assignmentCheckbox} />
        <div className={styles.assignmentName}>{name}</div>
      </label>
      <ul className={styles.detail}>
        <li>Due {dueDate}</li>
        <li>Description: {description}</li>
      </ul>
    </div>
  );
};