import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image,
    ListView,
    PixelRatio,
    InteractionManager,
} from 'react-native';

import Common from '../common/constants';
import Swiper from 'react-native-swiper';
import {HomeAction} from '../action/HomeAction';
import Loading from '../common/Loading';

import HomeSwioer from '../Pages/HomeSwiper';

let isRefreshing = false;
let isLoading = true;
let offest = '';
let tag = '';
let limit = 21;

export default class Home extends Component {
    constructor(props) {
        super(props);
        this._renderRow = this._renderRow.bind(this);

        this.state = {
            dataSource: new ListView.DataSource({
                rowHasChanged: (row1, row2) => row1 !== row2,
            }),
        };
    }

    componentDidMount() {
        console.log("dddd");
        InteractionManager.runAfterInteractions(() => {
            const {dispatch, HomeReducer} = this.props;
            //    HomeReducer.isLoading = true;
            dispatch(HomeAction(this.props.type, tag, offest, limit, isRefreshing, isLoading));
        });
    }
    render() {
        const { HomeReducer } = this.props;
        let homeList = [];

        //homeList = HomeReducer.HomeList;

        // let homeList = HomeReducer.HomeList;

        return (
            <View style={styles.container}>
            <Text>
            sssss
            </Text>
                {/* {HomeReducer.isLoading ? <Loading /> :
                    <ListView
                        dataSource={this.state.dataSource.cloneWithRows(homeList.module ? homeList.module : []) }
                        renderRow={this._renderRow}
                        enableEmptySections={true}
                        initialListSize= {1}
                        style={styles.listView}
                        />
                } */}
            </View>

        );

    }

    _renderRow(rowDate, rowID, rowIdentities) {
        // console.log('rowIDssss============>'+rowIdentities);
        switch (parseInt(rowDate.moduleStyle)) {

            case 101:
                if (rowIdentities == parseInt(rowDate.modulePosition) - 1) {
                    return (

                            <HomeSwioer bannerDate={rowDate}/>

                    );
                }

            default:
                return (
                    <View style={{ width: Common.window.width, height: 100, backgroundColor: 'blue' }}>

                    </View>
                );;
        }
    }

}
const styles = StyleSheet.create({
    container: {
        flex:1,
        width: Common.window.width,
        height: Common.window.height -90-55,
        backgroundColor: 'rgb(240, 240, 240)',

    },
    contentContainer: {
        backgroundColor: 'rgb(240, 240, 240)'
    },


    listView: {

        backgroundColor: 'white',
    },
    cellStyle:{
        backgroundColor: 'rgb(240, 240, 240)'

    },

});
