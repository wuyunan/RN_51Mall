import React, {Component} from 'react';
import {
    StyleSheet,
    TextInput,
    Text,
    View,
    ScrollView,
    Image,
    InteractionManager,
} from 'react-native';
import Button from 'react-native-button';

import Common from '../common/constants';
import Global from '../common/Global'

import {LoginAction} from '../action/LoginAction';
import CheckInContainer from '../containers/CheckInContainer'

let isRefreshing = false;
let isLoading = true;


export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
        };

    }

    componentDidMount() {

        InteractionManager.runAfterInteractions(() => {


            Global.storage.load({
                key: 'logininfo'
            }).then(ret => {
                // 如果找到数据，则在then方法中返回
                console.log(ret);
                this.setState({
                    username: ret.username,
                    password: ret.password
                });

            }).catch(err => {
                // 如果没有找到数据且没有sync方法，
                // 或者有其他异常，则在catch中返回
                // console.warn(err.message);
                switch (err.name) {
                    case 'NotFoundError':
                        // TODO;
                        break;
                    case 'ExpiredError':
                        // TODO
                        break;
                }
            })
        });
    }


    render() {
        const {LoginReducer, navigator} = this.props;
        let loginData = LoginReducer.loginData;
        console.log(loginData);
        if (loginData.jsessionid !== undefined) {
            this.timer = setTimeout(() => {
                InteractionManager.runAfterInteractions(() => {
                    navigator.push({
                        component: CheckInContainer,
                        name: 'CheckInContainer'
                    });
                });
            }, 500);
        }
        var message;
        if (loginData.succeed !== undefined) {
            message = loginData.message;
        }

        return (
            <View style={styles.container}>

                <ScrollView
                    contentContainerStyle={styles.scrollView} //非常重要，让ScrollView的子元素占满整个区域
                    keyboardDismissMode='on-drag' //拖动界面输入法退出
                    keyboardShouldPersistTaps={false} //点击输入法意外的区域，输入法退出
                >
                    <Image
                        source={{uri: 'http://oss-hz.qianmi.com/qianmicom/u/cms/qmwww/201511/03102524l6ur.png'}}
                    />
                    <TextInput
                        style={styles.input}

                        placeholder='username'
                        value={this.state.username}
                        onChangeText={(username) => this.setState({username})}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder='password'

                        value={this.state.password}
                        onChangeText={(password) => this.setState({password})}
                        password={true}/>
                    <Text
                        style={styles.errorMessage}>
                        {loginData.message}
                    </Text>

                    <Button
                        style={styles.button}
                        styleDisabled={{color: 'red'}}
                        onPress={() => {


                            Global.storage.save({
                                key: 'logininfo',
                                rawData: {
                                    username: this.state.username,
                                    password: this.state.password,
                                },
                            });

                            InteractionManager.runAfterInteractions(() => {
                                const {dispatch, EteamsReducer} = this.props;
                                //    HomeReducer.isLoading = true;
                                dispatch(LoginAction(this.state.username, this.state.password, isRefreshing, isLoading));
                            });
                        }}>
                        登录
                    </Button>


                </ScrollView>

            </View>

        );

    }


}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: Common.window.width,
        height: Common.window.height - 90 - 55,
        flexDirection: 'column',
        backgroundColor: 'rgb(240, 240, 240)',
        justifyContent: 'center',


    },
    contentContainer: {
        backgroundColor: 'rgb(240, 240, 240)'
    },

    cellStyle: {
        backgroundColor: 'rgb(240, 240, 240)',
        height: 44,
        padding: 10,
        justifyContent: 'center',
    },
    scrollView: {
        width: Common.window.width,
        height: Common.window.height - 90 - 55,
        flex: 1,
        justifyContent: 'center',


    },
    button: {
        fontSize: 20,
        color: 'green',
        alignSelf: 'stretch', //非常重要，覆盖父样式
        alignItems: 'center',
        justifyContent: 'center',
        height: 40,
        borderRadius: 5,
        marginTop: 10
    },
    input: {
        height: 40,
        marginTop: 10
    },
    errorMessage: {
        color: 'red',
        fontSize: 12,


    }

});
