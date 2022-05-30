import { LOGIN, LOGOUT, LOGIN_ERROR } from "../constants/auth";

export const signIn = (data) => dispatch => {
    dispatch({
        type: LOGIN,
        payload: data
    });
    // console.log("signin action call");
}

export const signOut = () => dispatch => {
    dispatch({
        type: LOGOUT,
        payload: {}
    });
    // console.log("signut action call");
}
export const signInError = (data) => dispatch => {
    dispatch({
        type: LOGIN_ERROR,
        payload: data
    });
    // console.log("signin error action call");
}