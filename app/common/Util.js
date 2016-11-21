'use strict'


import CryptoUtil from './CryptoUtil'


var Key_Des = 'blue!@#$%';
var Key_MD5 = 'Gwn1zaQtCPUnd688jIruSS6gZvfShvNB';

/**
 *
 * @param obj
 * @returns {string}
 */
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
};

/**
 *
 * @param param
 * @returns {*}
 */
let getParams = function (param) {

    var paramMap = {
        appid: "jsa101",
        dnet : "WIFI",
        dmd  : "NX529J",
        appm : "nt",
        dos  : "and",
        dbr  : "nubia",
        appch: "Meizu",
        area : "530000_530100_530102_0",
        did  : "e749d974-5dcf-44ac-9b60-298d65a288ba",
        dscr : "1920*1080",
        ts   : Date.parse(new Date()),
        appv : "1.0",
        body : param,
        sign : ''
    };

    var paramNeedSign = '';
    Object.keys(paramMap)
        .sort()
        .forEach(function (key, i) {
            var value = paramMap[key];
            if (value === undefined || value === '' || key === "sign") {
                delete paramMap[key];

            } else {
                if (paramNeedSign !== '') {
                    paramNeedSign += '&';
                }
                paramNeedSign += key + '=' + value;
            }
        });

    console.log(paramMap);

    paramMap.sign = CryptoUtil.encryptByMD5(paramNeedSign, Key_MD5);
    console.log(paramMap);

    return paramMap;
}

let Util = {

    post: (url, param, successCallback, failCallback) => {
        console.log(url);

        var encryptedBody = CryptoUtil.encryptByDES(param, Key_Des);

        var option = {
            method : 'POST',
            headers: {
                'Content-type': 'application/x-www-form-urlencoded;charset=utf-8',
            },
            body   : toQueryString(getParams(encryptedBody))

        };

        console.log(option);
        fetch(url, option).then((response) => response.text())
            .then((responseText) => {
                successCallback(JSON.parse(responseText));
            })
            .catch((err) => {
                console.log(err);
                failCallback(err);
            });

    },

    post2: (url, param, successCallback, failCallback) => {

        var option = {
            method     : 'POST',
            headers    : {
                'Content-type': 'application/x-www-form-urlencoded;charset=utf-8',
            },
            credentials: 'omit',
            body       : toQueryString(param)

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
    get : (url, successCallback, failCallback) => {
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
        var request                = new XMLHttpRequest();
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

};

export default Util;
