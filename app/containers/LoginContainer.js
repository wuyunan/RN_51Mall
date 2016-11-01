/**
 * Created by jason
 */
import React from 'react';
import {connect} from 'react-redux';
import Login from '../components/Login';

class LoginContainer extends React.Component {

    render() {
        return (
            <Login {...this.props} />

        )
    }
}

export default connect((state) => {
    const {LoginReducer} = state;
    return {
        LoginReducer
    }
})(LoginContainer);
