/**
 * Created by jason
 */

import React, {Component} from 'react';
import {
    View,
    ScrollView,
    PixelRatio,
    InteractionManager,
} from 'react-native';

import Common from '../common/constants';
import Buttom from '../widget/Buttom';
import SubCategoryListView from '../widget/SubCategoryListView';
import styles  from '../../style/Category'
import {CategoryAction, SubCategoryAction} from '../action/CategoryAction';
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

        let topCategory = CategoryReducer.TopCategory;
        let secondCategory = CategoryReducer.SecondCategory;
        let isLoadingSubcategory = CategoryReducer.isLoadingSubCategory;


        console.log(isLoadingSubcategory)
        if (topCategory !== undefined && Array.length < topCategory.length) {

            topCategory.map((object, i) => {
                if (i === 0) {
                    Array.push(1);
                } else {
                    Array.push(0);
                }
            });
        }


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

                                                            Array.map((object, i) => {
                                                                Array[i] = 0;
                                                            });
                                                            Array.splice(i, 1, 1);
                                                            this.setState({
                                                                defaultNum: i,
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
                                { CategoryReducer.isLoadingSubCategory ? <Loading /> :

                                    <SubCategoryListView module={secondCategory}/>
                                }
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

