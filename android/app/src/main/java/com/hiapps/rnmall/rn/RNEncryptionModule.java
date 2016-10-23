package com.hiapps.rnmall.rn;

import android.util.Log;

import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.hiapps.rnmall.common.AppConstants;
import com.hiapps.rnmall.util.RequestUtil;

import java.util.Map;

/**
 * 模块:
 * 功能:
 * 创建者: wuyunan
 * 创建于: 2016/10/20.
 * 版本:
 */

public class RNEncryptionModule extends ReactContextBaseJavaModule {

    public RNEncryptionModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return "RNEncryptionModule";
    }


    /**
     * API参数
     *
     * @param bodyString  待加密数据
     * @param successBack
     * @param errorBack
     */
    @ReactMethod
    public void getApiParamByCallBack(String bodyString, String token, Callback successBack, Callback errorBack) {
        try {
            Log.d("T","getApiParamByCallBack");
            Map<String, String> map = RequestUtil.getSignedParamMap(bodyString,
                    token,
                    getCurrentActivity(),
                    AppConstants.APPMODE.REACT_NATIVE);


            String result = RequestUtil.getSignedParamString(map);

            successBack.invoke(result);
        } catch (Exception e) {
            errorBack.invoke(e.getMessage());
            e.printStackTrace();
        }
    }

    /**
     * API参数
     *
     * @param bodyString 待加密数据
     * @param promise
     * @param token
     */
    @ReactMethod
    public void getApiParamByPromise(String bodyString, String token, Promise promise) {
        try {
            Map<String, String> map = RequestUtil.getSignedParamMap(bodyString,
                    token,
                    getCurrentActivity(),
                    AppConstants.APPMODE.REACT_NATIVE);


            String result = RequestUtil.getSignedParamString(map);

            promise.resolve(result);
        } catch (Exception e) {
            promise.reject(e);
            e.printStackTrace();
        }
    }


}
