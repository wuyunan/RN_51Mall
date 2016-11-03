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
import {
    Button,
    FormLabel,
    FormInput,
    Icon
} from 'react-native-elements'

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
                    <View style={styles.contentContainer}>

                        <Icon
                            style={styles.icon}

                            raised
                            name='heartbeat'
                            type='font-awesome'
                            color='#f50'/>

                        <FormLabel>用户名</FormLabel>
                        <FormInput
                            style={styles.input}

                            placeholder='用户名'
                            value={this.state.username}
                            onChangeText={(username) => this.setState({username})}
                        />
                        <FormLabel>密码</FormLabel>

                        <FormInput
                            style={styles.input}
                            placeholder='请输入密码'

                            value={this.state.password}
                            onChangeText={(password) => this.setState({password})}
                            password={true}
                            secureTextEntry={true}/>
                        <Text
                            style={styles.errorMessage}>
                            {loginData.message}
                        </Text>


                        <Button
                            style={styles.button}
                            small
                            icon={{name: 'envira', type: 'font-awesome'}}
                            title='登录'
                            backgroundColor='#397af8'
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

                        </Button>
                    </View>

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
        backgroundColor: 'rgb(240, 240, 240)',

    },
    contentContainer: {
        width: Common.window.width,
        backgroundColor: 'rgb(240, 240, 240)',
        flexDirection: 'column',
        justifyContent: 'center',

    },

    icon: {
        height: 100,
        width: 100,
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
