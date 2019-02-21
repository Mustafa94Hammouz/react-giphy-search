import {GET_USER, USER_SEARCH} from "../constants/constants";

const initialState = {
        searchTerm:''
}

export const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_USER: {
            return { ...state, user : action.payload} // check this
        }

        case USER_SEARCH:{
            return {...state, searchTerm: action.payload}
        }
        default:
            return state;

    }
};
