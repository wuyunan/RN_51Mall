import * as types from '../action/ActionType';

const initialState = {
    checkinData: {},
    checkStatusData: {},
    isLoading: true,
    isRefreshing: false,
};

let checkinReducer = (state = initialState, action) => {

    switch (action.type) {
        case  types.FETCH_ETEAMS_CHECKIN:
            return Object.assign({}, state, {
                isRefreshing: action.isRefreshing,
                isLoading: false,
            })

        case types.RECEIVE_ETEAMS_CHECKIN:

            return Object.assign({}, state, {
                checkinData: action.checkinData,
                isRefreshing: false,
                isLoading: false,
            })
        case  types.FETCH_ETEAMS_CHECK_STATUS:
            return Object.assign({}, state, {
                isRefreshing: action.isRefreshing,
                isLoading: false,
            })

        case types.RECEIVE_ETEAMS_CHECK_STATUS:

            return Object.assign({}, state, {
                checkStatusData: action.checkStatusData,
                isRefreshing: false,
                isLoading: false,
            })
        default:
            return state;
    }
}

export default checkinReducer;
