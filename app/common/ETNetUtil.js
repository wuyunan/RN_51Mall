'use strict'
import Global from '../common/Global'

const toQueryString = function (obj) {
    return obj ? Object.keys(obj).sort().map(function (key) {
        var val = obj[key];
        if (Array.isArray(val)) {
            return val.sort().map(function (val2) {
                return encodeURIComponent(key) + '=' + encodeURIComponent(val2);
            }).join('&');
        }
        return encodeURIComponent(key) + '=' + encodeURIComponent(val);
    }).join('&') : '';
}


let ETNetUtil = {

    post: (url, param, successCallback, failCallback) => {

        Global.storage.load({
            key: 'user'
        }).then(ret => {
            // 如果找到数据，则在then方法中返回
            console.log(ret);

            if (ret.jsessionid !== undefined) {
                url += '&jsessionid=' + ret.jsessionid;
            }

            var option = {
                method: 'POST',
                headers: {
                    'Content-type': 'application/x-www-form-urlencoded;charset=utf-8',
                    'Cookie': 'ETEAMSID=' + ret.ETEAMSID + ';ROUTEID=.r1',
                },
                credentials: 'omit',
                body: toQueryString(param)

            };
            fetch(url, option).then((response) => response.text())
                .then((responseText) => {
                    successCallback(JSON.parse(responseText));
                })
                .catch((err) => {
                    failCallback(err);
                });

        }).catch(err => {
            // 如果没有找到数据且没有sync方法，
            // 或者有其他异常，则在catch中返回
            // console.warn(err.message);
            switch (err.name) {
                case 'NotFoundError':
                    // TODO;
                    break;
                case 'ExpiredError':
                    // TODO
                    break;
            }
        })

    },
    postWithoutToken: (url, param, successCallback, failCallback) => {


        var option = {
            method: 'POST',
            headers: {
                'Content-type': 'application/x-www-form-urlencoded;charset=utf-8',
            },
            credentials: 'omit',
            body: toQueryString(param)

        };
        fetch(url, option).then((response) => response.text())
            .then((responseText) => {
                successCallback(JSON.parse(responseText));
            })
            .catch((err) => {
                failCallback(err);
            });


    },
    /*
     * fetch简单封装
     * url: 请求的URL
     * successCallback: 请求成功回调
     * failCallback: 请求失败回调
     *
     * */
    get: (url, successCallback, failCallback) => {
        fetch(url)
            .then((response) => response.text())
            .then((responseText) => {
                successCallback(JSON.parse(responseText));
            })
            .catch((err) => {
                failCallback(err);
            });
    },


}


let getSignParam = (bodyParam) => {
    console.log(bodyParam);


    // paramMap.set(KeyParam.KEY_BODY , ""),
    //
    // for (var [key, value] of paramMap) {
    //   console.log(key + " = " + value);
    // }

}

export default ETNetUtil;
