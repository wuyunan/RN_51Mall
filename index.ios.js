import React, { Component } from 'react';
import { AppRegistry,Navigator } from 'react-native';

// import SimpleNavigationApp from './app/SimpleNavigationApp';
import Root from './app/components/Home';
// 注册应用(registerComponent)后才能正确渲染
// 注意：只把应用作为一个整体注册一次，而不是每个组件/模块都注册
AppRegistry.registerComponent('RNTestProject', () => Root);
