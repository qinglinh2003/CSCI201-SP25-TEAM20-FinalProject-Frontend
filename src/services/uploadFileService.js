import api from "./api"


/**
 * [POST] Upload File
 * @param {string} username
 *  @param {FormData} formData
 * TODO: Not Implemented
 */
export function uploadFile(username,formData){
    return api.post("/upload-file", formData, {
        headers:{
            'Content-Type': 'multipart/form-data',
        }
    });
}


/**
 * [POST] Upload File
 * @param {string} username
 *  @param {FormData} formData
 * TODO: Not Implemented
 */
export function uploadManualInput(username,formData){
    return api.post("/upload-manual-input", formData, {
        headers:{
            'Content-Type': 'multipart/form-data',
        }
    });
}
