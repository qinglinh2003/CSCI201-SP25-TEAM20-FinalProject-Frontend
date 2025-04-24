import api from "./api"


/**
 * [POST] Upload File
 * @param {string} username
 * TODO: Not Implemented
 */
export function uploadFile(username){
    return api.post("/upload-file");
}
