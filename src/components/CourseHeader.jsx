import React from 'react';
import styles from '../features/course_page/CoursePage.module.css';

export const CourseHeader = ({ courseID, days, time }) => {
  return (
    <div className={styles.courseTitle}>
      <div id={styles.courseID}>{courseID}</div>
      <div id={styles.day}>{days}</div>
      <div id={styles.time}>{time}</div>
    </div>
  );
};