/**
 * CategoryAction
 * 因为没有api 只能拿固定数据
 */


import * as types from './ActionType';
import Util from '../common/Util';
import Common from '../common/constants';

export let CategoryAction = ( isRefreshing, isLoading) => {

    let URL = 'http://apidev.niuchuangwin.com/app/call?code=homepage&ver=1';
    console.log(URL)
    return dispatch => {
        // dispatch(feachHomeList(isRefreshing, isLoading));
        dispatch(feachTopCategory(isRefreshing, isLoading));
        return Util.post(URL, "",(response) => {
            // console.log(response)
            //由于没有api 只能拿真实的固定数据
            // dispatch(receiveTopCategory(response.pins))

                console.log('请求分类数据')
                dispatch(receiveTopCategory(Common.TopCategory.data))

        }, (error) => {
            console.log('加载分类数据error==>' + error);
            // // debugger
            dispatch(receiveTopCategory(Common.TopCategory.data));
        });

    }

}




export let SubCategoryAction = ( isRefreshing, isLoading) => {

    let URL = 'http://apidev.niuchuangwin.com/app/call?code=homepage&ver=1';
    console.log(URL)
    return dispatch => {
        // dispatch(feachHomeList(isRefreshing, isLoading));
        dispatch(feachTopCategory(isRefreshing, isLoading));
        return Util.post(URL, "",(response) => {
            // console.log(response)
            //由于没有api 只能拿真实的固定数据
            // dispatch(receiveTopCategory(response.pins))

                console.log('请求分类数据')
                dispatch(receiveSubCategory(Common.SubCategory.data))

        }, (error) => {
            console.log('加载分类数据error==>' + error);
            // // debugger
            dispatch(receiveSubCategory(Common.SubCategory.data));
        });

    }

}


function encode_utf8(str) {
    return encodeURIComponent(str);
}

let feachTopCategory = (isRefreshing, isLoading) => {
    return {
        type: types.FETCH_TOP_CATEGORY_LIST,
        // isLoadMore: isLoadMore,
        isRefreshing: isRefreshing,
        isLoading: isLoading,
    }
}

let receiveTopCategory = (topCategory) => {
    // console.log(homeList)
    return {
        type: types.RECEIVE_TOP_CATEGORY_LIST,
        topCategory: topCategory,
    }
}


let feachSubCategory = (isRefreshing, isLoading) => {
    return {
        type: types.FETCH_SECOND_CATEGORY_LIST,
        // isLoadMore: isLoadMore,
        isRefreshing: isRefreshing,
        isLoading: isLoading,
    }
}
let receiveSubCategory = (subCatrgory) => {
    // console.log(homeList)
    return {
        type: types.RECEIVE_SECOND_CATEGORY_LIST,
        subCatrgory: subCatrgory,
    }
}
