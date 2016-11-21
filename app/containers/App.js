/**
 * Created by jason .
 */
import React from 'react';
import {
    Navigator,
    View,
    StyleSheet,
    Text,
} from 'react-native';

import Splash from '../components/Splash';
import StatusBarIOS from '../components/StatusBarIOS';
import TabBarView from './TabBarView';
import LoginContainer from './LoginContainer';

class App extends React.Component {
    render() {

        return (
            <View style={{ flex: 1 }}>
                <StatusBarIOS barStyle="default"/>

                <Navigator
                    initialRoute={{
                        name: 'TabBarView',
                        component: TabBarView
                    }}

                    configureScene={(route) => {
                        if (route.sceneConfig) {
                            return route.sceneConfig;
                        }
                        return Navigator.SceneConfigs.FloatFromRight;
                    } }
                    renderScene={(route, navigator) => {
                        let Component = route.component;
                        return (
                            <Component navigator = {navigator} route = {route} {...route.passProps} />
                        )
                    } }
                />
            </View>
        )
    }
}

export default App;
