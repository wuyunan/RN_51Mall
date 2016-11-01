/**
 * CategoryAction
 * 因为没有api 只能拿固定数据
 */
'use strict';
import React, {
    AsyncStorage,
} from 'react-native';

import * as types from './ActionType';
import Util from '../common/Util';
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


        Global.storage.load({
            key: 'user'
        }).then(ret => {
            // 如果找到数据，则在then方法中返回
            console.log(ret);
            if (ret.jsessionid !== undefined) {
                URL += '&jsessionid=' + ret.jsessionid;
            }
            var param = {
                userId: ret.employeeid
            }
            return Util.post2(URL, param, (response) => {
                // console.log(response)
                //由于没有api 只能拿真实的固定数据
                dispatch(receiveCheckStatus(response))


            }, (error) => {
                console.log('CheckStatusAction error==>' + error);
                // // debugger
                dispatch(receiveCheckStatus({}));
            });


        }).catch(err => {
            // 如果没有找到数据且没有sync方法，
            // 或者有其他异常，则在catch中返回
            console.warn(err.message);
            switch (err.name) {
                case 'NotFoundError':
                    // TODO;
                    break;
                case 'ExpiredError':
                    // TODO
                    break;
            }
        })
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

    let URL = 'https://www.eteams.cn/app/timecard/check.json?client=iphone&version=3.6.12';
    if (jsessionid !== undefined) {
        URL += '&jsessionid=' + jsessionid;
    }
    var param = {
        type: "CHECKIN",
        longitude: 121.4816602,
        latitude: 31.1793978,
        checkAddress: "泛微网络科技有限公司",
    }

    return dispatch => {
        dispatch(feachCheckIn(isRefreshing, isLoading));
        return Util.post2(URL, param, (response) => {
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