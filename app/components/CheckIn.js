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
import {CheckinAction, CheckStatusAction} from '../action/CheckInAction';
import Loading from '../common/Loading';


let isRefreshing = false;
let isLoading = true;


export default class CheckIn extends Component {
    constructor(props) {
        super(props);


    }

    componentDidMount() {
        InteractionManager.runAfterInteractions(() => {
            const {dispatch, CheckinReducer} = this.props;
            //    HomeReducer.isLoading = true;
            dispatch(CheckStatusAction(isRefreshing, isLoading));
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

        var userName;
        let StatusText;

        if (checkStatusData.timecard !== undefined) {
            userName = checkStatusData.timecard.user.name;
            if (checkStatusData.timecard.type === "CHECKIN") {
                StatusText = <Text style={styles.cellStyle}>
                    状态: 已签到 {checkStatusData.timecard.statusMsg} {checkStatusData.checkIn}
                </Text>
            } else {
                StatusText = <Text style={styles.cellStyle}>
                    状态: {checkStatusData.timecard.statusMsg}
                </Text>
            }
        } else {
            StatusText = <Text style={styles.cellStyle}>
                状态: 获取中……
            </Text>
        }


        return (
            <View style={styles.container}>

                {CheckinReducer.isLoading ? <Loading /> :
                    <View style={styles.container}>
                        <Text style={styles.cellStyle}>
                            用户名: {userName}
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
                                        dispatch(CheckinAction(loginData.jsessionid, isRefreshing, isLoading));
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
