

import * as types from '../action/ActionType';

const initialState = {
    HomeList: [],
    isLoading: true,
    isRefreshing: false,
};

let homeReducer = (state = initialState, action) => {

    switch (action.type) {
        case types.FETCH_HOME_LIST, types.FETCH_SEAUGO_LIST:
            return Object.assign({}, state, {
                isRefreshing: action.isRefreshing,
                isLoading: action.isLoading
            })

        case types.RECEIVE_HOME_LIST:

            return Object.assign({}, state, {
                HomeList: action.homeList,
                isRefreshing: false,
                isLoading: false,
            })
    
        default:
            return state;
    }
}

export default homeReducer;
