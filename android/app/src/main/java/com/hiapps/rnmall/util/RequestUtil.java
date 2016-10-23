package com.hiapps.rnmall.util;


import android.content.Context;
import android.graphics.Point;
import android.text.TextUtils;

import com.hiapps.rnmall.common.AppConstants;
import com.hiapps.rnmall.util.sign.CommonSecret;
import com.hiapps.rnmall.util.sign.DesUtils;
import com.hiapps.rnmall.util.sign.SignUtils;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


/**
 * 模块:
 * 功能:
 * 创建人: wuyunan
 * 时间: 16/7/29
 */

public class RequestUtil {

    /**
     * app id
     */
    private static final String KEY_APP_ID = "appid";
    /**
     * app版本
     */
    private static final String KEY_APP_VERSION = "appv";
    private static final String KEY_APP_MODE = "appm";
    private static final String KEY_APP_CHANNEL = "appch";
    private static final String KEY_DEVICE_ID = "did";
    private static final String KEY_DEVICE_BRAND = "dbr";
    private static final String KEY_DEVICE_MODEL = "dmd";
    private static final String KEY_DEVICE_OS = "dos";
    private static final String KEY_DEVICE_SCREEN = "dscr";
    private static final String KEY_DEVICE_NET = "dnet";
    private static final String KEY_AREA = "area";
    private static final String KEY_LONGITUDE = "lng";
    private static final String KEY_LATITUDE = "lat";
    private static final String TOKEN = "token";
    private static final String KEY_TS = "ts";
    public static final String KEY_BODY = "body";

    /**
     * 配置post参数,Md5签名
     *
     * @param bodyString
     * @param token
     * @param context
     * @param appMode
     * @return
     */
    public static Map<String, String> getSignedParamMap(String bodyString,
                                                        String token,
                                                        Context context,
                                                        String appMode) {


        Map<String, String> needSignParam = new HashMap<>();

        needSignParam.put(KEY_APP_ID, AppConstants.APPID.JSB_AND);
        needSignParam.put(KEY_APP_VERSION, StrUtils.getVersion(context));
        needSignParam.put(KEY_APP_MODE, appMode);
        needSignParam.put(KEY_APP_CHANNEL, "Meizu");
        needSignParam.put(KEY_DEVICE_ID, Installation.id(context));
        needSignParam.put(KEY_DEVICE_BRAND, android.os.Build.BRAND);
        needSignParam.put(KEY_DEVICE_MODEL, android.os.Build.DEVICE);
        needSignParam.put(KEY_DEVICE_OS, AppConstants.OS.ANDROID);
        Point screenSize = StrUtils.getScreenSize(context);

        if (screenSize != null) {
            needSignParam.put(KEY_DEVICE_SCREEN,
                    String.format("%d*%d", screenSize.y, screenSize.x));
        }

        needSignParam.put(KEY_DEVICE_NET, StrUtils.getAPNType(context) == StrUtils.WIFI ? "WIFI" : "");
        needSignParam.put(KEY_AREA, "530000_530100_530102_0");
//        needSignParam.put(KEY_LONGITUDE, "34.22334");
//        needSignParam.put(KEY_LATITUDE, "121.34232");


        if (!TextUtils.isEmpty(token)) {
            needSignParam.put(TOKEN, token);
        }


        needSignParam.put(KEY_TS, String.valueOf(System.currentTimeMillis()));

        if (!TextUtils.isEmpty(bodyString)) {
            needSignParam.put(KEY_BODY, bodyString);
        }


        if (needSignParam.containsKey(KEY_BODY)) {
            try {
                if (!TextUtils.isEmpty(needSignParam.get(KEY_BODY))) {
                    String bodyEncrypt = DesUtils.encrypt(needSignParam.get(KEY_BODY),
                            CommonSecret.DATASECRET.JSB_DES);
                    needSignParam.put(KEY_BODY, bodyEncrypt);
                }
            } catch (Exception e) {
                e.printStackTrace();
            }
        }

        return SignUtils.buildRequestPara(needSignParam);
    }

    /**
     * @param singedParam
     * @return
     */
    public static String getSignedParamString(Map<String, String> singedParam) {
        List<String> kvs = new ArrayList<>();
        for (Map.Entry<String, String> entry : singedParam.entrySet()) {
            kvs.add(String.format("\"%s\":\"%s\"", entry.getKey(), entry.getValue()));
        }
        StringBuffer stringBuffer = new StringBuffer();
        stringBuffer.append('{');
        stringBuffer.append(TextUtils.join(",", kvs));
        stringBuffer.append('}');
        return stringBuffer.toString();
    }

}
