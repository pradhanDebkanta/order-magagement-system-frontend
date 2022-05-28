import { CREATE_ORDER, DELETE_ORDER, EDIT_ORDER, GET_ORDER, ERROR_IN_ORDER } from "../constants/order";

const initialState = {
    orderList: [],
    totalOrders: 0,
    loading: true,
    error: false,
    errormessage: '',
};

const orderDetails = (state = initialState, action) => {
    const { type, payload } = action;
    switch (type) {
        case CREATE_ORDER:
            state.orderList.pop();
            state.orderList.unshift(payload);
            console.log(state,"create order store");
            return {
                ...state,
                loading: false,
                error: false,
                errormessage: '',
            }
        case DELETE_ORDER:
            let temp1 = state.orderList?.filter((item) => item.id !== payload.id)
            return {
                ...state,
                orderList: temp1,
                loading: false,
                error: false,
                errormessage: '',
            }

        case EDIT_ORDER:
            let temp = state.orderList?.map((item) => item.id === payload.id ? payload : item)
            return {
                ...state,
                orderList: temp,
                loading: false,
                error: false,
                errormessage: '',
            }
        case GET_ORDER:
            return {
                ...state,
                orderList: payload.data,
                totalOrders: payload.totalItem,
                loading: false,
                error: false,
                errormessage: '',

            }
        case ERROR_IN_ORDER:
            return {
                ...state,
                loading: false,
                error: true,
                errormessage: payload,

            }
        default:
            return state
    }
};

export default orderDetails;