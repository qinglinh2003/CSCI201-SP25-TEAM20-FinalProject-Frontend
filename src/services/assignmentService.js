import api from "./api"


/**
 * [POST] Create Assignment
 * @param {string} username
 * TODO: Not Implemented
 */
export function createAssignment(username){
    return api.post("/create-assignment");
}


/**
 * [GET] Create Assignment
 * @param {string} username
 * @param {string} assignmentName
 * TODO: Not Implemented
 */
export function searchAssignmentByName(username, assignmentName){
    return api.get("/search-assignment");
}

/**
 * [PATCH] Mark Complete Assignment
 * @param {string} username
 * @param {string} assignmentID
 * TODO: Not Implemented
 */
export function markCompleteAssignment(username, assignmentID){
    return api.patch("/mark-complete-assignment");
}


/**
 * [Patch] Edit Assignment
 * @param {string} username
 * @param {string} assignmentID
 * TODO: Not Implemented
 */
export function editAssignmentInfo(username, assignmentID){
    return api.patch("/edit-assignment-info");
}

/**
 * [DELETE] Remove Assignment
 * @param {string} username
 * @param {string} assignmentID
 * TODO: Not Implemented
 */
export function removeAssignment(username, assignmentID){
    return api.delete("/remove-assignment");
}