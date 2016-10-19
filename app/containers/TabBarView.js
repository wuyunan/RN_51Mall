import React, { Component } from 'react';
import {
    View,
    Text,
    Image,
    TabBarIOS,
} from 'react-native';

import TabNavigator from 'react-native-tab-navigator';
import Icon from 'react-native-vector-icons/Ionicons';

// import HomeContainer from '../containers/HomeContainer';
// import ClassContainer from '../containers/ClassContainer';
// import weixin from '../pages/weixin';

// import Home from '../components/Home';
import Brand from '../components/Brand';
import Classify from '../components/Classify';
import ShoppingCart from '../components/Cart';
import AboutMe from '../components/AboutMe';

import HomeContainer from './HomeContainer';
// import BrandContainer from './BrandContainer';
// import ShopCarContainer from './ShopCarContainer';


import FontAwesome from 'react-native-vector-icons/FontAwesome';

// const tabBarItems = [
//     { title: '首页', icon:'home' , component: HomeContainer },
//     { title: '分类', icon:'th', component: Classify },
//     { title: '购物车', icon:'shopping-cart', component: ShoppingCart },
//     { title: '品牌', icon:'bookmark', component: Brand },
//     { title: '我的', icon:'user' , component: AboutMe },
// ]

const tabBarItems = [
    { title: '首页', icon:() => <Icon name={'md-home'} size={30} /> , component: HomeContainer },
    { title: '品牌', icon:() => <Icon name={'md-bookmark'} size={30} />, component: Brand },
    { title: '分类', icon: () =><Icon name={'md-apps'} size={30} />, component: Classify },
    { title: '购物车', icon: () =><Icon name={'md-cart'} size={30} /> , component: ShoppingCart },
    { title: '我的', icon:() => <Icon name={'md-contact'} size={30} /> , component: AboutMe },
]

export default class TarBarView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedTab: tabBarItems[0].title,
        };
    }
    render() {
        return (
            // <TabBarIOS tintColor={'red'} >
            //     {
            //         tabBarItems.map((controller, i) => {
            //
            //             let Component = controller.component;
            //
            //             return (
            //                 <FontAwesome.TabBarItem
            //                     key={i}
            //                     title={controller.title}
            //                     iconName={controller.icon}
            //                     selectedIconName={controller.icon}
            //                     selected={this.state.selectedTab === controller.title}
            //                     onPress={() => {
            //                         this.setState({
            //                            selectedTab: controller.title
            //                         })
            //                     }}
            //                 >
            //                     <Component navigator = {this.props.navigator} {...this.props}/>
            //                 </FontAwesome.TabBarItem>
            //             )
            //         })
            //     }
            // </TabBarIOS>

            <TabNavigator tabBarStyle={{ height: 60 }}>
                {
                    tabBarItems.map((controller, i) => {
                        //获取容器页面
                        //下面就讲navigation 赋值进去,这样没有容器页面就有nav
                        let Component = controller.component;
                        return (
                            <TabNavigator.Item
                                key= {i}
                                selected={this.state.selectedTab === controller.title}
                                title={controller.title}
                                renderIcon={controller.icon}
                                onPress={() => this.setState({ selectedTab: controller.title }) }>

                                <Component navigator = {this.props.navigator} {...this.props}/>
                            </TabNavigator.Item>
                        )
                    })
                }
            </TabNavigator >
            //这里都可以对navigator 进行传递
        );
    }


}
