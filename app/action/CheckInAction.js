/**
 * CategoryAction
 * 因为没有api 只能拿固定数据
 */
'use strict';
import React, {
    AsyncStorage,
} from 'react-native';

import * as types from './ActionType';
import ETNetUtil from '../common/ETNetUtil';
import Global from '../common/Global'


/**
 *
 * @param isRefreshing
 * @param isLoading
 * @returns {function(*)}
 * @constructor
 */
export let CheckStatusAction = (isRefreshing, isLoading) => {

    return dispatch => {
        dispatch(feachCheckStatus(isRefreshing, isLoading));

        let URL = 'https://www.eteams.cn/app/timecard/checkTime.json?client=iphone&version=3.6.12';

        var param = {}
        return ETNetUtil.post(URL, param, (response) => {
            // console.log(response)
            //由于没有api 只能拿真实的固定数据
            dispatch(receiveCheckStatus(response))


        }, (error) => {
            console.log('CheckStatusAction error==>' + error);
            // // debugger
            dispatch(receiveCheckStatus({}));
        });


    }


}

/**
 *
 * @param isRefreshing
 * @param isLoading
 * @returns {function(*)}
 * @constructor
 */
export let CheckinAction = (jsessionid, isRefreshing, isLoading) => {


    return dispatch => {
        dispatch(feachCheckIn(isRefreshing, isLoading));

        let URL = 'https://www.eteams.cn/app/timecard/check.json?client=iphone&version=3.6.12';


        var param = {
            type: "CHECKIN",
            longitude: 121.4816602,
            latitude: 31.1793978,
            checkAddress: "泛微网络科技有限公司",
        }

        return ETNetUtil.post(URL, param, (response) => {
            // console.log(response)
            //由于没有api 只能拿真实的固定数据
            dispatch(receiveCheckIn(response))


        }, (error) => {
            console.log('CheckinAction error==>' + error);
            // // debugger
            dispatch(receiveCheckIn({}));
        });


    }
}


function encode_utf8(str) {
    return encodeURIComponent(str);
}


let feachCheckIn = (isRefreshing, isLoading) => {
    return {
        type: types.FETCH_ETEAMS_CHECKIN,
        isRefreshing: isRefreshing,
        isLoadingSubCategory: isLoading,
    }
}

let receiveCheckIn = (data) => {
    return {
        type: types.RECEIVE_ETEAMS_CHECKIN,
        checkinData: data,
    }
}

let feachCheckStatus = (isRefreshing, isLoading) => {
    return {
        type: types.FETCH_ETEAMS_CHECK_STATUS,
        isRefreshing: isRefreshing,
        isLoadingSubCategory: isLoading,
    }
}

let receiveCheckStatus = (data) => {
    // console.log(homeList)
    return {
        type: types.RECEIVE_ETEAMS_CHECK_STATUS,
        checkStatusData: data,
    }
}