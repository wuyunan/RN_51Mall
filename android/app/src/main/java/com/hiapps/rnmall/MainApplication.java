package com.hiapps.rnmall;

import android.app.Application;

import com.facebook.react.ReactApplication;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.hiapps.rnmall.rn.RNTestPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.smixx.reactnativeicons.ReactNativeIcons;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {



    private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {


        @Override
        protected boolean getUseDeveloperSupport() {
            return BuildConfig.DEBUG;
        }

        @Override
        protected List<ReactPackage> getPackages() {
            return Arrays.<ReactPackage>asList(
                    new MainReactPackage(),
                    new VectorIconsPackage(),
                    new RNTestPackage(),
                    new ReactNativeIcons()
            );
        }
    };


    public void onCreate() {
        super.onCreate();
//        Stetho.initializeWithDefaults(this);
//        OkHttpClient client = new OkHttpClient.Builder()
//                .connectTimeout(0, TimeUnit.MILLISECONDS)
//                .readTimeout(0, TimeUnit.MILLISECONDS)
//                .writeTimeout(0, TimeUnit.MILLISECONDS)
//                .cookieJar(new ReactCookieJarContainer())
//                .addNetworkInterceptor(new StethoInterceptor())
//                .build();
//        OkHttpClientProvider.replaceOkHttpClient(client);
    }

    @Override
    public ReactNativeHost getReactNativeHost() {
        return mReactNativeHost;
    }
}
