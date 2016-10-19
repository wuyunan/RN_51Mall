/**
 * Created by ljunb on 16/5/27.
 */


let KeyParam = {
    KEY_APP_ID : "appid",
    KEY_APP_VERSION : "appv",
    KEY_APP_MODE : "appm",
    KEY_APP_CHANNEL : "appch",
    KEY_DEVICE_ID : "did",
    KEY_DEVICE_BRAND : "dbr",
    KEY_DEVICE_MODEL : "dmd",
    KEY_DEVICE_OS : "dos",
    KEY_DEVICE_SCREEN : "dscr",
    KEY_DEVICE_NET : "dnet",
    KEY_AREA : "area",
    KEY_LONGITUDE : "lng",
    KEY_LATITUDE : "lat",
    KEY_TOKEN : "token",
    KEY_TS : "ts",
    KEY_BODY : "body"
 }

let Util = {
    post: (url, param, successCallback, failCallback) => {
        fetch(url, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(param)
            })
            .then((response) => response.text())
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


let getSignParam = (bodyParam) => {
    console.log(bodyParam);
    var paramMap = new Map();

    paramMap.set(KeyParam.KEY_APP_ID , "jsa101");
    paramMap.set(KeyParam.KEY_APP_MODE , "nt");
    paramMap.set(KeyParam.KEY_APP_CHANNEL , "nc");
    paramMap.set(KeyParam.KEY_DEVICE_ID , "12345-22222-3333-4444");
    paramMap.set(KeyParam.KEY_DEVICE_BRAND , "Meizu");
    paramMap.set(KeyParam.KEY_DEVICE_MODEL , "Pro6");
    paramMap.set(KeyParam.KEY_DEVICE_OS , "and");
    paramMap.set(KeyParam.KEY_DEVICE_SCREEN , "1080*1920");
    paramMap.set(KeyParam.KEY_DEVICE_NET , "WIFI");
    paramMap.set(KeyParam.KEY_AREA , "530000_530100_530200_0");
    // paramMap.set(KeyParam.KEY_TOKEN , ""),
    paramMap.set(KeyParam.KEY_TS , Date.now());
    // paramMap.set(KeyParam.KEY_BODY , ""),
    //
    // for (var [key, value] of paramMap) {
    //   console.log(key + " = " + value);
    // }
    //return paramMap;
}

export default Util;
