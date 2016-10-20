package com.rntestproject;

import android.app.Application;
import android.content.Context;

import com.facebook.react.ReactApplication;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.modules.network.OkHttpClientProvider;
import com.facebook.react.modules.network.ReactCookieJarContainer;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.stetho.Stetho;
import com.facebook.stetho.okhttp3.StethoInterceptor;
import com.oblador.vectoricons.VectorIconsPackage;
import com.rntestproject.rn.RNTestPackage;
import com.smixx.reactnativeicons.ReactNativeIcons;

import java.util.Arrays;
import java.util.List;
import java.util.concurrent.TimeUnit;

import okhttp3.OkHttpClient;

public class MainApplication extends Application implements ReactApplication {

    private static MainApplication instance;


    public static synchronized MainApplication getInstance() {
        if (null == instance) {
            instance = new MainApplication();
        }
        return instance;
    }

    public static Context getContext() {
        return getInstance().getApplicationContext();
    }


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
        Stetho.initializeWithDefaults(this);
        OkHttpClient client = new OkHttpClient.Builder()
                .connectTimeout(0, TimeUnit.MILLISECONDS)
                .readTimeout(0, TimeUnit.MILLISECONDS)
                .writeTimeout(0, TimeUnit.MILLISECONDS)
                .cookieJar(new ReactCookieJarContainer())
                .addNetworkInterceptor(new StethoInterceptor())
                .build();
        OkHttpClientProvider.replaceOkHttpClient(client);
    }

    @Override
    public ReactNativeHost getReactNativeHost() {
        return mReactNativeHost;
    }
}
