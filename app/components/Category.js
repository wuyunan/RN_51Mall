/**
 * Created by jason
 */

import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image,
    ListView,
    ScrollView,
    PixelRatio,
    InteractionManager,
} from 'react-native';

import Common from '../common/constants';
import Buttom from '../widget/Buttom';
import SubCategoryListView from '../widget/SubCategoryListView';

import {CategoryAction,SubCategoryAction} from '../action/CategoryAction';
import Loading from '../common/Loading';

let isRefreshing = false;
let isLoading = true;

let Array = [];

export default class Category extends Component {
    constructor(props) {
        super(props);
        this.state = {
            defaultNum: 0,
            selectArray: [1],
        };
    }


    componentDidMount() {
        InteractionManager.runAfterInteractions(() => {
            const {dispatch, CategoryReducer} = this.props;
            //    HomeReducer.isLoading = true;
            dispatch(CategoryAction(isRefreshing, isLoading));
        });
    }


    render() {
        const {CategoryReducer} = this.props;
        let topCategory = [];
        let secondCategory = [];

        topCategory = CategoryReducer.TopCategory;
        secondCategory = CategoryReducer.SecondCategory;
        const BrandNameStyle = {
            justifyContent: 'center',
            alignItems: 'center',
            width: Common.window.width / 4,
            height: 50,
            backgroundColor: 'rgb(240, 240, 240)',
            borderColor: 'gray',
            borderWidth: 1 / PixelRatio.get(),
            borderLeftWidth: 0,
            borderTopWidth: 0
        };
        console.log(CategoryReducer);
        return (
            <View style={styles.container}>
                {
                    CategoryReducer.isLoading ? <Loading /> :
                        <View style={styles.mainViewStyle}>
                            <View style={styles.left_container}>
                                <ScrollView >
                                    {
                                        topCategory.map((object, i) => {
                                                const isSelect = this.state.selectArray[i];
                                                console.log('isSelect=====>' + this.state.selectArray);
                                                return (
                                                    <Buttom
                                                        key={i}
                                                        containerStyle={
                                                            [BrandNameStyle, isSelect ? styles.top_category_selected : styles.top_category_normal]
                                                        }
                                                        style={[{
                                                            fontSize: 16,
                                                            textAlign: 'center'
                                                        }, isSelect ? {color: 'red'} : {color: 'black'}]}
                                                        text={object.catalogName}
                                                        onPress={() => {

                                                            console.log(this.props)
                                                             Array.map((object, i) => {
                                                              Array[i] = 0;
                                                             });
                                                             Array.splice(i, 1, 1);
                                                             this.setState({
                                                                 defaultNum: 2,
                                                                 selectArray: Array,
                                                             });

                                                            InteractionManager.runAfterInteractions(() => {
                                                                const {dispatch, CategoryReducer} = this.props;
                                                                //    HomeReducer.isLoading = true;
                                                                dispatch(SubCategoryAction(isRefreshing, isLoading));
                                                            });
                                                        }}
                                                    />
                                                );
                                            }
                                        )
                                    }
                                </ScrollView>
                            </View>

                            <View style={styles.right_container}>
                                <SubCategoryListView module={secondCategory}/>
                            </View>
                        </View>
                }
            </View>
        );
    }


    _onTopCategoryPress() {
        console.log(this.props)
        // Array.map((object, i) => {
        //   Array[i] = 0;
        // });
        // Array.splice(i, 1, 1);
        // this.setState({
        //     defaultNum: 2,
        //     selectArray: Array,
        // });

        InteractionManager.runAfterInteractions(() => {
            const {dispatch, CategoryReducer} = this.props;
            //    HomeReducer.isLoading = true;
            dispatch(SubCategoryAction(isRefreshing, isLoading));
        });
        // InteractionManager.runAfterInteractions(() => {
        //   const {dispatch} = this.props;
        //   dispatch(BrandAction(i + 1, tag, offest, limit, isRefreshing, isLoading));
        // });
    }

}

const styles = StyleSheet.create({
    mainViewStyle: {
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    left_container: {
        backgroundColor: 'white',
        width: Common.window.width / 4,
        height: Common.window.height - 60,
    },
    top_category_normal: {
        backgroundColor: '#fcfcfc',
        borderRightWidth: 1 / PixelRatio.get()
    },
    top_category_selected: {
        backgroundColor: 'rgb(240, 240, 240)',
        borderRightWidth: 0
    },
    right_container: {
        backgroundColor: 'blue',
        width: Common.window.width * 3 / 4,
        height: Common.window.height - 60,
        justifyContent: 'center',
        alignItems: 'center',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    listView: {

        backgroundColor: 'white',
        width: 150
    },
    cellStyle: {
        backgroundColor: 'rgb(240, 240, 240)',
        height: 44,
        alignItems: 'center',
    },
});
