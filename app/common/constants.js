import { Dimensions } from 'react-native';

let window = {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
}

import HomeData from '../data/HomeData';
import AreaData from '../data/AreaData';
import TopCategory from '../data/TopCategory'

import HomePage from '../data/HomePage'

export default {
    window: window,
    HomeDate: HomeData,
    AreaData: AreaData,
    HomePage: HomePage,
    TopCategory: TopCategory,
}
