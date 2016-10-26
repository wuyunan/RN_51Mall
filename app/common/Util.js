'use strict'

const REUQEST_URL = 'http://test.cqdpyy.ucmed.cn/api/exec/1.htm';
const APP_KEY = 'ZW5sNWVWOWhibVJ5YjJsaw==';
const REQUEST_TIME = new Date().getTime();

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

let data = {"D": "ffffffff-88ac-cfac-ffff-ffffb7e805c5", "T": "1", "V": "1.0.0", "type": 1};

const RequestBuilder = function (params) {
    Object.assign(data, params);
    console.log(data);
    return fetch(REUQEST_URL, {
        method: 'POST',
        headers: {
            'Accept': 'application/xml',
            'K': APP_KEY,
            'Content-type': 'application/x-www-form-urlencoded;charset=utf-8',
            'Time': REQUEST_TIME
        },
        body: toQueryString({
            'requestData': JSON.stringify(data)
        })
    }).then(response => response.json());
}


let Util = {
    post: (url, param, successCallback, failCallback) => {


        var {NativeModules}=require('react-native');
        var Encryption = NativeModules.RNEncryptionModule;

        Encryption.getApiParamByCallBack(param, "", function (base64) {

            var option = {
                method: 'POST',
                headers: {
                    'Content-type': 'application/x-www-form-urlencoded;charset=utf-8',
                },
                body: toQueryString(JSON.parse(base64))

            };
            fetch(url, option).then((response) => response.text())
                .then((responseText) => {
                    successCallback(JSON.parse(responseText));
                })
                .catch((err) => {
                    failCallback(err);
                });
        }, function () {
            console.log("error");
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
    gets: (url, successCallback, failCallback) => {
        var request = new XMLHttpRequest();
        request.onreadystatechange = (e) => {
            if (request.readyState !== 4) {
                return;
            }

            if (request.status === 200) {
                successCallback(JSON.parse(request.responseText))

            } else {
                // console.warn('error');
            }
        };

        request.open('GET', url);
        request.send();
    },

    getForPromise: (url) => {
        return new Promise((resolve, reject) => {
            fetch(url)
                .then((response) => response.text())
                .then((responseText) => {
                    resolve(JSON.parse(responseText));
                })
                .catch((err) => {
                    reject(new Error(err));
                    console.warn(err);
                }).done();
        });
    }

}


let getSignParam = (bodyParam) => {
    console.log(bodyParam);


    // paramMap.set(KeyParam.KEY_BODY , ""),
    //
    // for (var [key, value] of paramMap) {
    //   console.log(key + " = " + value);
    // }

}

export default Util;
