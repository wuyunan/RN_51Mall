import Storage from 'react-native-storage';
import {AsyncStorage} from 'react-native';


var storage = new Storage({
    size: 1000,
    defaultExpires: null,
    storageBackend: AsyncStorage,
    enableCache: true,
})


export default {
    storage: storage
}



