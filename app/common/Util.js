let Util = {
    post: (url, param, successCallback, failCallback) => {


        // var {NativeModules}=require('react-native');
        // var Encryption = NativeModules.RNEncryptionModule;
        // Encryption.getApiParamByCallBack("","", function(base64) {
            //console.log(base64);
var base64 = {};
            fetch(url, {
                    method: 'POST',
                    // body: toQueryString( JSON.parse(base64))
                     body: toQueryString(base64)

                })
                .then((response) => response.text())
                .then((responseText) => {
                    successCallback(JSON.parse(responseText));
                })
                .catch((err) => {
                    failCallback(err);
                });
        // }, function() {
        //     console.log("error");
        // });

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

        request.open('GET',url);
        request.send();
    },

    getForPromise:(url) => {
        return new Promise((resolve,reject) => {
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
function toQueryString(obj) {
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

let getSignParam = (bodyParam) => {
    console.log(bodyParam);



    // paramMap.set(KeyParam.KEY_BODY , ""),
    //
    // for (var [key, value] of paramMap) {
    //   console.log(key + " = " + value);
    // }

}

export default Util;
