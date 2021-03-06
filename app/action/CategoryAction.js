/**
 * CategoryAction
 * 因为没有api 只能拿固定数据
 */

import * as types from './ActionType';
import Util from '../common/Util';
import Common from '../common/constants';

/**
 *
 * @param isRefreshing
 * @param isLoading
 * @returns {function(*)}
 * @constructor
 */
export let CategoryAction = (isRefreshing, isLoading) => {

    let URL = 'http://apidev.niuchuangwin.com/app/call?code=queryEntranceCatalog&ver=1';

    return dispatch => {

        dispatch(feachTopCategory(isRefreshing, isLoading));

        return Util.post(URL, "", (response) => {
            // console.log(response)
            //由于没有api 只能拿真实的固定数据
            dispatch(receiveTopCategory(response.data))

            // console.log('请求分类数据')
            // dispatch(receiveTopCategory(Common.TopCategory.data))

        }, (error) => {
            console.log('加载TOP分类数据error==>' + error);
            // // debugger
            dispatch(receiveTopCategory(Common.TopCategory.data));
        });

    }

};

/**
 *
 * @param isRefreshing
 * @param isLoading
 * @returns {function(*)}
 * @constructor
 */
export let SubCategoryAction = (catrgoryId, isRefreshing, isLoading) => {

    let URL   = 'http://apidev.niuchuangwin.com/app/call?code=querySubCatalog&ver=1';
    var param = {
        id: catrgoryId
    }

    return dispatch => {
        dispatch(feachSubCategory(isRefreshing, isLoading));
        return Util.post(URL, JSON.stringify(param), (response) => {
            // console.log(response)
            //由于没有api 只能拿真实的固定数据
            dispatch(receiveSubCategory(response.data))

            // console.log('请求分类数据')
            // dispatch(receiveSubCategory(Common.SubCategory.data))

        }, (error) => {
            console.log('加载分类数据error==>' + error);
            // // debugger
            dispatch(receiveSubCategory(Common.SubCategory.data));
        });

    }

};

function encode_utf8(str) {
    return encodeURIComponent(str);
}

let feachTopCategory = (isRefreshing, isLoading) => {
    return {
        type        : types.FETCH_TOP_CATEGORY_LIST,
        // isLoadMore: isLoadMore,
        isRefreshing: isRefreshing,
        isLoading   : isLoading,
    }
};

let receiveTopCategory = (topCategory) => {
    // console.log(homeList)
    return {
        type       : types.RECEIVE_TOP_CATEGORY_LIST,
        topCategory: topCategory,
    }
};

let feachSubCategory = (isRefreshing, isLoading) => {
    return {
        type                : types.FETCH_SECOND_CATEGORY_LIST,
        // isLoadMore: isLoadMore,
        isRefreshing        : isRefreshing,
        isLoadingSubCategory: isLoading,
    }
};

let receiveSubCategory = (subCatrgory) => {
    // console.log(homeList)
    return {
        type       : types.RECEIVE_SECOND_CATEGORY_LIST,
        subCatrgory: subCatrgory,
        // isLoadingSubCategory: true,
    }
};
