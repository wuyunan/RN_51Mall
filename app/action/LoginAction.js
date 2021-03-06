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
export let LoginAction = (usr, pwd, isRefreshing, isLoading) => {

    Global.storage.remove({
        key: 'user'
    });

    let URL = 'https://www.eteams.cn/teamsLogin?client=iphone&version=3.6.12';
    var param = {
        username: usr,
        password: pwd,
    }


    return dispatch => {
        dispatch(feachEteamsLogin(isRefreshing, isLoading));
        return ETNetUtil.postWithoutToken(URL, param, (response) => {
            // console.log(response)
            //由于没有api 只能拿真实的固定数据
            dispatch(receiveEteamsLogin(response))

            Global.storage.save({
                key: 'user',
                rawData: {
                    jsessionid: response.jsessionId,
                    ETEAMSID: response.ETEAMSID,
                    username: response.username,
                    userid: response.userid,
                },
            });


        }, (error) => {
            console.log('EteamsLoginAction error==>' + error);
            // // debugger
            dispatch(receiveEteamsLogin({}));
        });

    }

}


function encode_utf8(str) {
    return encodeURIComponent(str);
}

let feachEteamsLogin = (isRefreshing, isLoading) => {
    return {
        type: types.FETCH_LOGIN,
        // isLoadMore: isLoadMore,
        isRefreshing: isRefreshing,
        isLoading: isLoading,
    }
}

let receiveEteamsLogin = (topCategory) => {
    // console.log(homeList)
    return {
        type: types.RECEIVE_LOGIN,
        loginData: topCategory,
    }
}


