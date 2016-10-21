/**
 * Created by jason
 */

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
import { CategoryAction } from '../action/CategoryAction';
import Loading from '../common/Loading';

let isRefreshing = false;
let isLoading = true;

export default class Category extends Component {
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
    InteractionManager.runAfterInteractions(() => {
      const {dispatch, CategoryReducer} = this.props;
      //    HomeReducer.isLoading = true;
      dispatch(CategoryAction(isRefreshing, isLoading));
    });
  }


  render() {
    const { CategoryReducer } = this.props;
    let topCategory = [];

    topCategory = CategoryReducer.topCategory;

    // let homeList = HomeReducer.HomeList;

    return (
      <View style={styles.container}>

        {CategoryReducer.isLoading ? <Loading /> :
          <ListView
            dataSource={this.state.dataSource.cloneWithRows(topCategory ? topCategory : [])}
            renderRow={this._renderRow}
            enableEmptySections={true}
            initialListSize={1}
            style={styles.listView}
            />
        }
      </View>

    );

  }

  _renderRow(rowDate, rowID, rowIdentities) {
    // console.log('rowIDssss============>'+rowIdentities);

    return (
      <View style={{ width: Common.window.width, height: 100, backgroundColor: 'blue' }}>
          <Text>q</Text>
      </View>
    );

  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  }
});
