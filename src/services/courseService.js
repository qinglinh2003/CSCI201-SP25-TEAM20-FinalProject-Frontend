import api from "./api"


/**
 * [POST] Create a Course
 * @param {string} username
 * TODO: Not Implemented
 */
export function createCourse(username){
    return api.post("/create-course");
}


/**
 * [GET] Search a Course by Name
 * @param {string} username
 * @param {string} courseName
 * TODO: Not Implemented
 */
export function searchCourseByName(username, courseName){
    return api.get("/search-course");
}

/**
 * [PATCH] Join a Course
 * @param {string} username
 * @param {string} courseID
 * TODO: Not Implemented
 */
export function joinCourse(username, courseID){
    return api.patch("/join-course");
}


/**
 * [Patch] Leave a Course
 * @param {string} username
 * @param {string} courseID
 * TODO: Not Implemented
 */
export function leaveCourse(username, courseID){
    return api.patch("/leave-course");
}

/**
 * [Patch] Get all assignments of a course
 * @param {string} username
 * @param {string} courseID
 * TODO: Not Implemented
 */
export function getCourseAssignments(username, courseID){
    return api.get("/get-course-assignments");
}