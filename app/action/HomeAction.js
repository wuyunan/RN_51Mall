/**
 * HomeAction
 * 因为没有api 只能拿固定数据
 */


import * as types from './ActionType';
import Util from '../common/Util';
import Common from '../common/constants';

export let HomeAction = ( isRefreshing, isLoading) => {

    let URL = 'http://apidev.niuchuangwin.com/app/call?code=homepage&ver=1';
    console.log(URL)
    return dispatch => {
        // dispatch(feachHomeList(isRefreshing, isLoading));
        dispatch(feachHomeList(isRefreshing, isLoading));
        return Util.post(URL, "",(response) => {
            // console.log(response)
            //由于没有api 只能拿真实的固定数据
            // dispatch(receiveHomeList(response.pins))

                console.log('请求首页数据')
                dispatch(receiveHomeList(Common.HomeDate))
        }, (error) => {
            console.log('加载首页数据error==>' + error);
            // // debugger
            dispatch(receiveHomeList([]));
        });

    }

}

function encode_utf8(str) {
    return encodeURIComponent(str);
}

let feachHomeList = (isRefreshing, isLoading) => {
    return {
        type: types.FETCH_HOME_LIST,
        // isLoadMore: isLoadMore,
        isRefreshing: isRefreshing,
        isLoading: isLoading,
    }
}

let receiveHomeList = (homeList) => {
    // console.log(homeList)
    return {
        type: types.RECEIVE_HOME_LIST,
        homeList: homeList,
    }
}
