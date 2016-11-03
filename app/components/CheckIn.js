import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    Alert,
    InteractionManager,
} from 'react-native';
import {
    Button,
} from 'react-native-elements'

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

    _checkOut() {
        Alert.alert(
            '提示',
            '暂时还没实现!',
        )
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
        let CheckButton;
        if (checkStatusData.timecardStatus !== undefined) {
            if (checkStatusData.timecardStatus === "CHECKIN") {
                StatusText = <Text style={styles.cellStyle}>
                    状态: 还没签到
                </Text>;
                CheckButton = <Button
                    small
                    icon={{name: 'book', type: 'font-awesome'}}
                    title='签到'
                    backgroundColor='#397af8'

                    onPress={() => {
                        console.log("You tapped the button!");
                        InteractionManager.runAfterInteractions(() => {
                            const {dispatch, EteamsReducer} = this.props;
                            //    HomeReducer.isLoading = true;
                            dispatch(CheckinAction(isRefreshing, isLoading));
                        });
                    }}/>
            } else if (checkStatusData.timecardStatus === "CHECKOUT") {
                StatusText = <View>
                    <Text style={styles.cellStyle}>
                        用户: { checkStatusData.timecard.user.username}
                    </Text>
                    <Text style={styles.cellStyle}>
                        状态:已签到 { checkStatusData.timecard.statusMsg}
                    </Text>
                    <Text style={styles.cellStyle}>
                        时间: { checkStatusData.checkIn }
                    </Text>
                    <Text style={styles.cellStyle}>
                        工作时间: { checkStatusData.workTime1 + " - " + checkStatusData.workTime2 }
                    </Text>
                    <Text style={styles.cellStyle}>
                        地址: { checkStatusData.timecard.checkAddress  }
                    </Text>
                </View>;
                CheckButton = <Button
                    small
                    icon={{name: 'envira', type: 'font-awesome'}}
                    title='签退'
                    backgroundColor='#397af8'
                    onPress={() => {
                        this._checkOut();

                    }}/>;
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

                        {StatusText}
                        {CheckButton}

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
