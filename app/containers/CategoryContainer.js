/**
 * Created by jason
 */
import React from 'react';
import {connect} from 'react-redux';
import Category from '../components/Category';

class CategoryContainer extends React.Component {

    render() {
        return (
            <Category {...this.props} />

        )
    }
}

export default connect((state) => {
    const { CategoryReducer } = state;
    return {
        CategoryReducer
    }
})(CategoryContainer);
