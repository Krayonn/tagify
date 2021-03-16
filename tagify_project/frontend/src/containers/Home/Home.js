import React, { Component } from "react";
import { render } from "react-dom";
import queryString from 'query-string';
import { connect } from 'react-redux';

import * as actions from '../../store/actions/index';
import Albums from '../../components/Albums/Albums';
import Playlists from "../../components/Playlists/Playlists";
import Tracks from '../../components/Tracks/Tracks';
import styles from './Home.module.scss';
import Layout from '../Layout/Layout';
import Filters from '../../components/Filters/Filters';
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/Spinner/Spinner';
import axios from '../../axios';
import Cookies from "universal-cookie";

const cookies = new Cookies();

class Home extends Component {
    state = {
        loaded: false,
        placeholder: "Loading",
        albums: null,
        playlists: null,
        tracks: null
    }

    componentDidMount() {
        console.log('MOUNTING')
        this.retrieveTokensHandler()

    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.tokens && this.props.tokens !== prevProps.tokens) {
            console.log('Componet did update');
            this.getMusicHandler('albums');
            this.getMusicHandler('playlists');
            this.getMusicHandler('tracks');
            this.props.onRetrieveTags();
        }
    }

    retrieveTokensHandler = () => {
        const params = queryString.parse(this.props.location.search)
        if (!this.props.tokens.authToken && params['code']) {
            axios.get('/api/token?authCode=' + params['code'])
                .then(response => {
                    console.log('got tokens!', response.data.access_token)
                    const authToken = response.data.access_token
                    const refreshToken = response.data.refresh_token
                    if (authToken) {
                        this.props.onRetrieveTokens(authToken, refreshToken)
                    }

                })
                .catch(response => {
                    console.log('getTokens failed')
                    return this.setState({ placeholder: "Something went wrong!" });
                })
        }
    }

    getMusicHandler = (type) => {
        axios.get("/api/" + type + "?token=" + this.props.tokens.authToken)
            .then(response => {
                console.log('got ' + type)
                this.props.onSaveMusic(type, response.data)
            })
            .catch(error => {
                this.setState(() => { placeholder: "Something went wrong!" })
                console.log('Something went wrong')
                return error;
            })

    }

    saveTagsHandler = () => {
        console.log('In save tags')

        const trackTags = Object.entries(this.props.tags).map(
            track => ({
                id: [track[0]],
                tags: track[1].map(tag => tag.value)
            })
        ).reduce((obj, item) => ({
            ...obj,
            [item.id]: item.tags
        }), {})

        console.log(trackTags);

        axios.post('/api/tagTracks/', trackTags, {
            headers: {
                "Content-Type": "application/json",
                "X-CSRFToken": cookies.get("csrftoken"),
            },
            credentials: "same-origin"
        })
            .then(res => console.log(res));
    }

    render() {

        let items = null;
        console.log('state', this.state)
        console.log('typeActive', this.props.typeActive)
        if (this.props.tokens.authToken && !this.props.musicData[this.props.typeActive]) {
            items = <Spinner />
            console.log('waiting...')
        }
        else {
            switch (this.props.typeActive) {
                case 'albums':
                    items = <Albums albums={this.props.musicData.albums} />;
                    break;
                case 'playlists':
                    items = <Playlists playlists={this.props.musicData.playlists} />;
                    break;
                case 'tracks':
                    items = <Tracks tracks={this.props.musicData.tracks} />;
                    break;
            }
        }

        return (
            <div>
                <Layout>
                    <Filters setActive={(type) => this.props.onSetTypeActive(type)} currentActive={this.props.typeActive} />
                    <div style={{ display: 'flex', justifyContent: 'space-between', margin: '10px' }}>
                        <input placeholder="my tag!" className={styles.TagSource} value={this.props.tagSource} onChange={(event) => this.props.onChangeTagSource(event.target.value)} />
                        <Button clicked={this.saveTagsHandler}>Save</Button>

                    </div>
                    <div style={{ margin: '10px' }}>
                        {items}
                    </div>

                </Layout>
            </div>
        );
    };
}

const mapStateToProps = state => {
    return {
        tokens: state.auth.tokens,
        username: state.auth.username,
        authenticated: state.auth.authenticated,
        tagSource: state.tag.tagSource,
        tags: state.tag.tags,
        typeActive: state.music.typeActive,
        musicData: state.music.musicData
    }

}
const mapDispatchToProps = dispatch => {
    return {
        onRetrieveTokens: (authToken, refreshToken) => dispatch(actions.retrieveAuthTokens(authToken, refreshToken)),
        onChangeTagSource: (input) => dispatch(actions.updateTagSource(input)),
        onSetTypeActive: (type) => dispatch(actions.setTypeActive(type)),
        onSaveMusic: (type, data) => dispatch(actions.saveMusic(type, data)),
        onLogin: (username) => dispatch(actions.login(username)),
        onLogout: () => dispatch(actions.logout()),
        onRetrieveTags: () => dispatch(actions.retrieveTags())
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(Home);