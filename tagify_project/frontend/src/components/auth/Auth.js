import React, {Component} from 'react';
import Link from 'react-router-dom';
import queryString from 'query-string';
import { connect } from 'react-redux';
import { retrieveAuthCode } from '../../store/action';

import * as actionTypes from '../../store/actionTypes';

class Auth extends Component {

    componentDidMount() {
        const params = queryString.parse(this.props.location.search)
        if (params.code) {
            const authCode = params.code
            this.props.onRetrieveAuthCode(authCode)
        }
    }

    authHandler = () => {
        window.location.assign('https://accounts.spotify.com/authorize?client_id=803253b42a634b1ca7f1ce3cbd115b91&response_type=code&redirect_uri=http://localhost:8080&scope=user-library-read&state=sdfshgadsf');
        // this.props.history.replace( 'https://example.com/callback?code=AQB8C8AvrotjMEp-FlBLkg5r8TSka-StKImM9Ek6Tlj5fKtJYGYsQF-NrgUcFFJiSp4tkGymKgZG4gry4NVaw4RTAaVaxQUX_4e5zM7kNa53xmazQYOUPX3PgOC4QPE9ranOXqg5PBYqMOyIj8w7zSZome2SkHhdui2Hhk9AVaI2NDL3QCbVJq4j5EyMI9C8o9NG&state=sdfshgadsf' );
    }
    render () {
        return (
            <div>
                <h1>AUTH</h1>
                <button onClick={this.authHandler}>auth me</button>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onRetrieveAuthCode: code => dispatch({type: actionTypes.RETRIEVE_AUTH_CODE, authCode: code})
    };
};
 

export default connect(null, mapDispatchToProps)(Auth);