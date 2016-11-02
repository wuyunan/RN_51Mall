import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Alert,
    InteractionManager,
} from 'react-native';
import Button from 'react-native-button';

import Common from '../common/constants';
import Global from '../common/Global'


import {CheckinAction, CheckStatusAction} from '../action/CheckInAction';
import Loading from '../common/Loading';


let isRefreshing = false;
let isLoading = true;


export default class CheckIn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
        };

    }

    componentDidMount() {
        InteractionManager.runAfterInteractions(() => {
            const {dispatch, CheckinReducer} = this.props;
            //    HomeReducer.isLoading = true;
            dispatch(CheckStatusAction(isRefreshing, isLoading));
            Global.storage.load({
                key: 'user'
            }).then(ret => {
                // 如果找到数据，则在then方法中返回
                this.setState({
                    username: ret.username,
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
            });
        });
    }


    render() {
        const {CheckinReducer} = this.props;

        console.log(CheckinReducer);


        let checkinData = CheckinReducer.checkinData;
        let checkStatusData = CheckinReducer.checkStatusData;
        let message = '';
        var hasMessage = false;
        if (checkinData.checkMap !== undefined) {
            message = checkinData.checkMap.message;
            hasMessage = true;
        }

        let StatusText;

        if (checkStatusData.timecardStatus !== undefined) {
            if (checkStatusData.timecardStatus === "CHECKIN") {
                StatusText = <Text style={styles.cellStyle}>
                    状态: 还没签到
                </Text>
            } else if (checkStatusData.timecardStatus === "CHECKOUT") {
                StatusText = <Text style={styles.cellStyle}>
                    状态: 已签到 {checkStatusData.timecard.statusMsg}
                </Text>
            }
        } else {
            StatusText = <Text style={styles.cellStyle}>
                状态: who know！！！
            </Text>
        }


        return (
            <View style={styles.container}>

                {CheckinReducer.isLoading ? <Loading /> :
                    <View style={styles.container}>
                        <Text style={styles.cellStyle}>
                            用户名: {this.state.username}
                        </Text>
                        {StatusText}
                        {checkStatusData.timecardStatus == "CHECKIN" ?
                            <Button
                                style={styles.button}
                                styleDisabled={{color: 'red'}}
                                onPress={() => {
                                    console.log("You tapped the button!");
                                    InteractionManager.runAfterInteractions(() => {
                                        const {dispatch, EteamsReducer} = this.props;
                                        //    HomeReducer.isLoading = true;
                                        dispatch(CheckinAction(isRefreshing, isLoading));
                                    });
                                }}>
                                签到
                            </Button> :
                            <Button
                                style={styles.button}
                                styleDisabled={{color: 'red'}}
                                onPress={() => {
                                    Alert.alert(
                                        '提示',
                                        '暂时还没实现!',
                                    )
                                }}>
                                签退
                            </Button>
                        }

                        <Text style={styles.cellStyle}>
                            {hasMessage ? message : ""}
                        </Text>

                    </View>
                }
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
    imagebutton: {},
    button: {
        fontSize: 20,
        color: 'green',
        height: 44,
        margin: 10,
        alignItems: 'center',
        justifyContent: 'center',
    }

});
