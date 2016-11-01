/**
 * Created by json on 16/5/25.
 * 根reducer
 */
import {combineReducers} from 'redux';
//添加个页面的reducer并进行合并
import HomeReducer from './HomeReducer';
import CategoryReducer from './CategoryReducer';
import CheckinReducer from  './CheckInReducer'
import LoginReducer from  './LoginReducer'

export default rootReducer = combineReducers({
    HomeReducer,
    CategoryReducer,
    CheckinReducer,
    LoginReducer
})
