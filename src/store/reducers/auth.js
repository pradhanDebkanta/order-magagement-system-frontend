import { LOGIN, LOGOUT, LOGIN_ERROR } from "../constants/auth";

const initialState = {
    userData: {},
    // userRole: "",
    isAuthenticated: false,
    loading: true,
    error: false,
    errormessage: '',
}

const auth = (state = initialState, action) => {
    const { type, payload } = action;
    switch (type) {
        case LOGIN:
            return {
                ...state,
                userData: payload,
                isAuthenticated: true,
                loading: false,
                error: false,
                errormessage: ""
            }
        case LOGOUT:
            return {
                ...state,
                userData: {},
                isAuthenticated: false,
                loading: false,
                error: false,
                errormessage: ""
            }
        case LOGIN_ERROR:
            return {
                ...state,
                userData: {},
                isAuthenticated: false,
                loading: false,
                error: true,
                errormessage: payload
            }
        default:
            return state;
    }
}

export default auth;