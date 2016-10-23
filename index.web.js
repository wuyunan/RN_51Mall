import React, { Component } from 'react';
import {
    AppRegistry,
    Platform,
} from 'react-native';

import Root from './app/Root';
// 注册应用(registerComponent)后才能正确渲染
// 注意：只把应用作为一个整体注册一次，而不是每个组件/模块都注册
AppRegistry.registerComponent('RNTestProject', () => Root);
if (Platform.OS == 'web') {
    var app = document.createElement('div');
    document.body.appendChild(app);
    AppRegistry.runApplication('Root', {
        rootTag: app
    });
}