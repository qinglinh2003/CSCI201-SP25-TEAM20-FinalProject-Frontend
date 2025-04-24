import api from "./api"


/**
 * [POST] User Login
 * @param {string} username
 * @param {string} password
 * TODO: endpoint is temporary. Update with the correct endpoint.
 */
export function login(username, password){
    return api.post("/login");
}


/**
 * [POST] User Create Account
 * @param {string} username
 * @param {string} password
 * TODO: endpoint is temporary. Update with the correct endpoint.
 */
export function register(username, password){
    return api.post("/register");
}