import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actionTypes from '../../store/actionTypes';
import Albums from '../../components/Albums/Albums';

class Auth extends Component {

    state = {
        albums: null
    }

    authHandler = () => {
        window.location.assign('https://accounts.spotify.com/authorize?client_id=803253b42a634b1ca7f1ce3cbd115b91&response_type=code&redirect_uri=http://localhost:8080&scope=user-library-read&state=sdfshgadsf');
    }

    render() {
        return (
            <div>
                <h1>AUTH</h1>
                <button onClick={this.authHandler}>auth me</button>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        authToken: state.authToken,
        refreshToken: state.refreshToken
    }

}
const mapDispatchToProps = dispatch => {
    return {
        onRetrieveTokens: (authToken, refreshToken) => dispatch(actions.retrieveAuthTokens(authToken, refreshToken))
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(Auth);