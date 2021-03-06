import React, {Component, PropTypes} from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image,
    ListView,
} from 'react-native';

import Common from '../common/constants';
import Loading from '../common/Loading';
const propTypes = {
    module: PropTypes.array.isRequired,
    isLoading: PropTypes.bool,
};

export default class SubCategoryListView extends Component {


    constructor(props) {
        super(props);
        this._renderRow = this._renderRow.bind(this);
        this.state = {
            dataSource: new ListView.DataSource({
                rowHasChanged: (row1, row2) => row1 !== row2,
            }),
        };
    }

    shouldComponentUpdate(nextProps) {
        if (nextProps.module !== this.props.module) {
            return true;
        }
        return false;
    }

    _renderRow(rowDate) {
        return (
            <View style={styles.row}>
                <View style={styles.title}>
                    <Image
                        style={{height:36}}
                        source={require("../img/search_tips.png")}
                    />
                    <Text style={{paddingLeft: 10}}>
                        {rowDate.catalogName}
                    </Text>
                </View>
                <View style={styles.sub_category_contains}>
                    {
                        rowDate.subCatalogs.map((object, i) => {


                            var iconDataSource = object.icon !== undefined ? {uri: object.icon} : require('../img/ic_image_placeholder_small.png');
                            return (
                                <TouchableOpacity
                                    key={i}
                                    activeOpacity={0.75}
                                    onPress={() => {
                                        alert('我是BrandListView')
                                    } }
                                    style={styles.sub_category}

                                >
                                    <Image
                                        source={iconDataSource}
                                        style={styles.rowDateImage}
                                    />
                                    <Text numberOfLines={1}
                                          style={{fontSize: 12}}
                                          textAlign={'center'}
                                    >
                                        {object.catalogName}
                                    </Text>

                                </TouchableOpacity>
                            );
                        })
                    }
                </View>
            </View>
        );
    }

    render() {
        return (

            <View style={styles.bgStyle}>
                <ListView
                    dataSource={this.state.dataSource.cloneWithRows(this.props.module ? this.props.module : []) }
                    renderRow={this._renderRow}
                    contentContainerStyle={styles.list}
                    enableEmptySections={true}
                    initialListSize={15}
                    style={styles.listView}
                />

            </View>

        )
            ;
    }
}

const styles = StyleSheet.create({
    listView: {
        backgroundColor: 'rgb(240, 240, 240)',
        width: Common.window.width * 3 / 4,
        height: Common.window.height - 60
    },
    list: {
        // justifyContent: 'center',
        flexDirection: 'column',
        alignItems: 'center',
        flexWrap: 'wrap',

    },
    row: {
        width: Common.window.width * 3 / 4,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',

    },
    title: {
        flexDirection: 'row',
        height: 48,
        width: Common.window.width * 3 / 4,
        justifyContent: 'flex-start',
        alignItems: "center",
    },

    sub_category_contains: {
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        flexDirection: 'row',
        width: Common.window.width * 3 / 4,
        backgroundColor: 'white',
        flexWrap: 'wrap',
        paddingTop: 10,
        marginLeft: 10,
        marginRight: 10,
        paddingBottom: 10,

    },
    sub_category: {
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        width: (Common.window.width * 3 / 4 - 20 ) / 3,
        backgroundColor: 'white'

    },
    rowDateImage: {
        justifyContent: 'center',
        alignItems: 'center',
        width: (Common.window.width * 3 / 4 - 50 ) / 3,
        height: ((Common.window.width * 3 / 4 - 50 ) / 3) * 4 / 5,
    },

    bgStyle: {
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',


    },

    text1: {
        marginLeft: 10,
    }
});
