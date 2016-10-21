

import * as types from '../action/ActionType';

const initialState = {
    TopCategory: [],
    SecondCategory: [],
    isLoading: true,
    isRefreshing: false,
};

let categoryReducer = (state = initialState, action) => {

    switch (action.type) {
        case types.FETCH_TOP_CATEGORY_LIST, types.FETCH_SECOND_CATEGORY_LIST:
            return Object.assign({}, state, {
                isRefreshing: action.isRefreshing,
                isLoading: action.isLoading
            })

        case types.RECEIVE_TOP_CATEGORY_LIST:

            return Object.assign({}, state, {
                TopCategory: action.topCategory,
                isRefreshing: false,
                isLoading: false,
            })
        case types.RECEIVE_SECOND_CATEGORY_LIST:

            return Object.assign({}, state, {
                SecondCategory: action.secondCategory,
                isRefreshing: false,
                isLoading: false,
            })
        default:
            return state;
    }
}

export default categoryReducer;
