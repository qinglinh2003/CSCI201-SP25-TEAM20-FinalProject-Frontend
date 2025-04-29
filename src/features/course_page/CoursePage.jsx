import {Link} from "react-router-dom";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { markCompleteAssignment, editAssignmentInfo, removeAssignment} from "../../services/assignmentService";
import { getCourseAssignments} from "../../services/courseService";
import { CourseHeader } from '../../components/CourseHeader';
import { AssignmentList } from '../../components/AssignmentList';

/*
* IMPORTANT! Use this .module.css file so that the styles are contained for the current module instead of interfering with other files
* To set styles for an element of a class, do <tag className={styles.class}></tag>, e.g. <div className={styles.inputWrapper}></div>
* */
import styles from "./CoursePage.module.css";


function CoursePage(){
    //unique user identifier
    //TODO: This is temporary. Update to align with the real login implementation.
    const username = localStorage.getItem("username");

    //Unique identifier for current course page. Extracted from the URL.
    const { courseId } = useParams();

    //Basic Info for the course
    const [courseData, setCourseData] = useState(null);

    //Assignments for the course
    const [assignments, setAssignments] = useState(null);

    //Load course assignments when the page is initiated
    useEffect(() => {
        fetchAssignments();
    }, [])

    /*
    * Add an assignment for the course
    * Redirects to the `UploadFile.jsx` Page
    * TODO: Might need another form so that users can only add assignments to the course of the current page
    * */
    const navigate = useNavigate();
    const handleAddAssignment = () => {
        navigate('/upload-file');
    }

    /*
    * Mark an assignment as complete
    * @param {string} assignmentID
    * */
    const handleMarkCompleteAssignment = async (assignmentID) => {
        try {
            const response = await markCompleteAssignment(username, assignmentID);
        } catch (e) {

        }

    }

    /*
    * Mark an assignment as complete
    * @param {string} assignmentID
    * */
    const handleEditAssignment = async (assignmentID) => {
        try {
            const response = await editAssignmentInfo(username, assignmentID);
        } catch (e) {

        }
    }

    /*
    * Remove an assignment
    * @param {string} assignmentID
    * */
    const handleRemoveAssignment = async (assignmentID) => {
        try {
            const response = await removeAssignment(username, assignmentID);
        } catch (e) {

        }
    }

    /*
    * Remove an assignment
    * @param {string} assignmentID
    * Ideally set `assignments` using `setAssignments()`
    * */
    const fetchAssignments = async () => {
        try {
            const response = await getCourseAssignments(username, courseId);
        } catch (e) {

        }
    }

    const courseInfo = {
      id: "CSCI 270",
      days: "T/Th",
      time: "11:00AM - 12:20PM"
    };
  
    const assignmentsList = [
      {
        name: "Group Project Assignment1",
        dueDate: "May 13th 11:59PM",
        description: ""
      },
      {
        name: "Group Project Assignment1",
        dueDate: "May 13th 11:59PM",
        description: ""
      }
    ];


    return(
      <div className={styles.courseDetailPage}>
      <div className={styles.rectangle}></div>
      <div className={styles.content}>
        <CourseHeader 
          courseID={courseInfo.id} 
          days={courseInfo.days} 
          time={courseInfo.time} 
        />
        <div className={styles.dashedLine}></div>
        <div className={styles.assignmentTitle}>Assignments</div>
        <AssignmentList assignments={assignmentsList} />
      </div>
    </div>
    )
}

export default CoursePage;
