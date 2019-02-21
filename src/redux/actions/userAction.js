import {GET_USER, USER_SEARCH} from "../constants/constants";

export function getUser(user) {
    return {
        type: GET_USER,
        payload: user
    }
}
export function searchGiphy(searchTerm) {
    return {
        type: USER_SEARCH,
        payload: searchTerm
    }
}

