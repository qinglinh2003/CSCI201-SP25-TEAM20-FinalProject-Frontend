import api from "./api";

/**
 * [POST] Create a Course
 * @param {string} username
 * TODO: Not Implemented
 */
export function createCourse(username) {
  return api.post("/create-course");
}

/**
 * [GET] Search a Course by Name
 * @param {string} username
 * @param {string} courseName
 * TODO: Not Implemented
 */
export function searchCourseByName(username, courseName) {
  return api.get("/search-course");
}

/**
 * [PATCH] Join a Course
 * @param {string} username
 * @param {string} courseID
 * TODO: Not Implemented
 */
export function joinCourse(username, courseID) {
  return api.patch("/join-course");
}

/**
 * [Patch] Leave a Course
 * @param {string} username
 * @param {string} courseID
 * TODO: Not Implemented
 */
export function leaveCourse(username, courseID) {
  return api.patch("/leave-course");
}

/**
 * [Patch] Get all assignments of a course
 * @param {string} username
 * @param {string} courseID
 * TODO: Not Implemented
 */
export function getCourseAssignments(username, courseID) {
  return api.get("/get-course-assignments");
}

/**
 * [GET] Get all user's courses
 * @param {string} username
 * TODO: Not Implemented
 */
export function getAllCourses(username) {
  // return api.get("/get-all-courses");
  return [
    {
      courseID: 1,
      courseName: "CSCI 201",
      meetingDates: "2025-01-15",
      meetingTime: "12:30 PM",
      assignments: [
        {
          assignmentID: 101,
          assignmentName: "Lab 4",
          dueDate: "2025-05-10",
          dueTime: "11:59 PM",
          assignmentDesc: "Complete the multithreading exercise",
        },
        {
          assignmentID: 102,
          assignmentName: "Quiz",
          dueDate: "2025-05-15",
          dueTime: "10:00 AM",
          assignmentDesc: "Midterm quiz on Java concurrency",
        },
      ],
    },
    {
      courseID: 2,
      courseName: "CSCI 270",
      meetingDates: "2025-01-16",
      meetingTime: "10:00 AM",
      assignments: [
        {
          assignmentID: 201,
          assignmentName: "Group Project",
          dueDate: "2025-05-20",
          dueTime: "11:59 PM",
          assignmentDesc: "Implement a sorting algorithm visualization",
        },
      ],
    },
    {
      courseID: 3,
      courseName: "CSCI 350",
      meetingDates: "2025-01-17",
      meetingTime: "2:00 PM",
      assignments: [
        {
          assignmentID: 301,
          assignmentName: "Midterm",
          dueDate: "2025-04-30",
          dueTime: "3:30 PM",
          assignmentDesc: "In-class midterm examination",
        },
      ],
    },
  ];
}
