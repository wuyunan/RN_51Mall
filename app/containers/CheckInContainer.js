/**
 * Created by jason
 */
import React from 'react';
import {connect} from 'react-redux';
import CheckIn from '../components/CheckIn';

class CheckInContainer extends React.Component {

    render() {
        return (
            <CheckIn {...this.props} />

        )
    }
}

export default connect((state) => {
    const {CheckinReducer} = state;
    return {
        CheckinReducer
    }
})(CheckInContainer);
