
import {
    StyleSheet,
    PixelRatio,
} from 'react-native';
import Common from '../app/common/constants';

const styles = StyleSheet.create({

    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    },
    mainViewStyle: {
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
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
        backgroundColor: 'white',
        width: Common.window.width * 3 / 4 - 20,
        height: Common.window.height - 60,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 10,
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


export default styles;
