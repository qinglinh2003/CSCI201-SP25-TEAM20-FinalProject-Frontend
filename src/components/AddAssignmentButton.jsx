import React from 'react';
import styles from '../features/course_page/CoursePage.module.css';

// Add this section with the button inside your CoursePage component's return statement
// after the AssignmentList component
const AddAssignmentButton = ({ onAddClick }) => {
  return (
    <div className={styles.addButtonContainer}>
      <button 
        className={styles.addButton}
        onClick={onAddClick}
      >
        + Add Assignment
      </button>
    </div>
  );
};

export default AddAssignmentButton;