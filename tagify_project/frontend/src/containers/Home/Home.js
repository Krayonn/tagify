import React, { Component } from "react";
import { render } from "react-dom";
import queryString from 'query-string';
import { connect } from 'react-redux';

import Auth from '../Auth/Auth';
import * as actions from '../../store/action';
import Albums from '../../components/Albums/Albums';
import styles from './Home.module.scss';
import Layout from '../Layout/Layout';
import Track from '../../components/Tracks/Track/Track';

class Home extends Component {
    state = {
        data: [],
        loaded: false,
        placeholder: "Loading",
        albums: null
    }

    componentDidMount() {
        console.log('MOUNTING')
        const params = queryString.parse(this.props.location.search)
        console.log("props", this.props)
        if (this.props.authToken === null && params['code'] != null) {
            console.log('Getting token')
            const url = "http://localhost:8000/api/token?authCode=" + params['code'];
            fetch(url)
                .then(response => {
                    if (response.status > 400) {
                        console.log('getTokens failed')
                        return this.setState(() => {
                            return { placeholder: "Something went wrong!" };
                        });
                    }
                    return response.json();
                })
                .then(data => {
                    console.log('got tokens!')
                    console.log(data)
                    const authToken = data.access_token
                    const refreshToken = data.refresh_token
                    console.log(authToken, refreshToken)
                    if (authToken) {
                        this.props.onRetrieveTokens(authToken, refreshToken)
                    }

                });
        }
    }

    getAlbumsHandler = () => {
        const url = "http://localhost:8000/api/albums?token=" + this.props.authToken;
        fetch(url)
            .then(response => {
                if (response.status > 400) {
                    console.log('here')
                    return this.setState(() => {
                        return { placeholder: "Something went wrong!" };
                    });
                }
                return response.json();
            })
            .then(data => {
                this.setState(() => {
                    console.log('here')
                    return {
                        albums: data
                    };
                });
            });
    }

    render() {
        let albums = null;
        if (this.state.albums) {
            console.log('have albums')
            console.log(this.state.albums)
            albums = (
                <Albums albums={this.state.albums} />
            )
        }
        return (
            <div>
                <Layout />

                <Auth />
                <input value={this.props.tagSource} onChange={(event) => this.props.onChangeTagSource(event.target.value)} />
                <Track
                    id='testTrackid123'
                    name='banger'
                    trackNumber='1' />
                <Track
                    id='testTrackid456'
                    name='banger2'
                    trackNumber='2' />
                {albums}
                <button onClick={this.getAlbumsHandler}>albums me up</button>
            </div>
        );
    };
}

const mapStateToProps = state => {
    return {
        authToken: state.authToken,
        refreshToken: state.refreshToken,
        tagSource: state.tagSource
    }

}
const mapDispatchToProps = dispatch => {
    return {
        onRetrieveTokens: (authToken, refreshToken) => dispatch(actions.retrieveAuthTokens(authToken, refreshToken)),
        onChangeTagSource: (input) => dispatch(actions.updateTagSource(input))

    };
};


export default connect(mapStateToProps, mapDispatchToProps)(Home);