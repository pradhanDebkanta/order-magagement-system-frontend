import ApiService from "../../services/apiService";
import { GET_ORDER, CREATE_ORDER, EDIT_ORDER, ERROR_IN_ORDER, DELETE_ORDER, GET_ALLL_ORDER } from "../constants/order";

// ApiService.get()
export const getAllOrder = () => async dispatch => {
    try {
        const res = await ApiService.get("/orderDetails");
        console.log(res);
        // dispatch({
        //     type: GET_ALLL_ORDER,
        //     payload: res
        // });

    } catch (err) {
        // order fetching error
        console.log(err);
        dispatch({
            type: ERROR_IN_ORDER,
            payload: err
        })
    }
}

export const getLimitedOrder = (body) => async dispatch => {
    try {
        const { data, headers } = await ApiService.get(`/orderDetails?_page=${body.pageNo}&_limit=${body.itemCount}`)
        let payloadData = {
            data,
            totalItem: headers["x-total-count"]
        }
        console.log(payloadData, "from getLimitedOrder");
        dispatch({
            type: GET_ORDER,
            payload: payloadData
        })

    } catch (err) {
        // order fetching error
        console.log(err);
        dispatch({
            type: ERROR_IN_ORDER,
            payload: err
        })
    }
}

export const createOrder = (data) => async dispatch => {
    try {
        const res = await ApiService.post(`/orderDetails`, {}, data)
        // console.log(res.data, "from createOrder");
        dispatch({
            type: CREATE_ORDER,
            payload: res.data
        })

    } catch (err) {
        // order fetching error
        console.log(err);
        dispatch({
            type: ERROR_IN_ORDER,
            payload: err
        })
    }
}

export const editOrder = (data) => async dispatch => {
    try {
        const res = await ApiService.patch(`/orderDetails/${data.id}`, {}, data)
        console.log(res.data, "from editOrder");
        dispatch({
            type: EDIT_ORDER,
            payload: res.data
        })

    } catch (err) {
        // order fetching error
        console.log(err);
        dispatch({
            type: ERROR_IN_ORDER,
            payload: err
        })
    }
}

export const deleteOrder = (id) => async dispatch => {
    try {
        const res = await ApiService.delete(`/orderDetails/${id}`, {})
        console.log(res, "from deleteOrder");
        dispatch({
            type: DELETE_ORDER,
            payload: { id },
        })
    } catch (err) {
        // order fetching error
        console.log(err);
        dispatch({
            type: ERROR_IN_ORDER,
            payload: err
        })
    }
}