import React from 'react';
import styles from '../features/course_page/CoursePage.module.css';
import { AssignmentItem } from './AssignmentItem';

export const AssignmentList = ({ assignments, onEditAssignment, onRemoveAssignment }) => {
  return (
    <div className={styles.assignments}>
      {assignments.map((assignment, index) => (
        <AssignmentItem
          key={index}
          name={assignment.name}
          dueDate={assignment.dueDate}
          description={assignment.description}
          onEdit={(data) => onEditAssignment(index, data)}
          onRemove={() => onRemoveAssignment(index)}
        />
      ))}
    </div>
  );
};