

import * as types from '../action/ActionType';

const initialState = {
    loginData: {},
    isLoading: true,
    isRefreshing: false,
};

let loginReducer = (state = initialState, action) => {

    switch (action.type) {
        case types.FETCH_LOGIN:
            return Object.assign({}, state, {
                isRefreshing: action.isRefreshing,
                isLoading: action.isLoading
            })

        case types.RECEIVE_LOGIN:

            return Object.assign({}, state, {
                loginData: action.loginData,
                isRefreshing: false,
                isLoading: false,
            })
        default:
            return state;
    }
}

export default loginReducer;
