import React, { Component } from "react";
import queryString from 'query-string';
import { connect } from 'react-redux';

import * as actions from '../../store/actions/index';
import Albums from '../../components/Albums/Albums';
import Playlists from "../../components/Playlists/Playlists";
import Tracks from '../../components/Tracks/Tracks';
import styles from './Home.module.scss';
import Filters from '../../components/Filters/Filters';
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';
import MiniSpinner from '../../components/UI/Spinner/MiniSpinner';
import axios from '../../axios';
import Cookies from "universal-cookie";
import Welcome from '../../components/Welcome/Welcome';
import ErrorMsg from '../../components/UI/ErrorMsg/ErrorMsg';

const cookies = new Cookies();

class Home extends Component {
    state = {
        loaded: false,
        placeholder: "Loading",
        savedTags: false,
        retrieveTokensError: null

    }

    componentDidMount() {
        this.retrieveTokensHandler()
    }
    componentWillUnmount() {
        // fix Warning: Can't perform a React state update on an unmounted component
        this.setState = (state,callback)=>{
            return;
        };
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.tokens.authTokens && this.props.tokens !== prevProps.tokens) {
            this.getMusicHandler('albums');
            this.getMusicHandler('tracks');
            this.getMusicHandler('playlists');
            this.props.onRetrieveTags(this.props.username);
        }
    }

    retrieveTokensHandler = () => {
        const params = queryString.parse(this.props.location.search)
        if (!this.props.tokens.authToken && params['code']) {
            axios.get('/api/token/?authCode=' + params['code'])
                .then(response => {
                    const authToken = response.data.access_token
                    const refreshToken = response.data.refresh_token
                    if (authToken) {
                        this.props.onLogin(response.data.user_profile)
                        this.props.onRetrieveTokens(authToken, refreshToken)
                    }

                })
                .catch(err => {
                    console.log('getTokens failed', err.response.data.error)
                    return this.setState({ retrieveTokensError: JSON.stringify(err.response.data.error) });
                })
        }
    }

    getMusicHandler = (type) => {
        axios.get("/api/" + type + "/?token=" + this.props.tokens.authToken)
            .then(response => {
                this.props.onSaveMusic(type, response.data)
            })
            .catch(error => {
                this.setState(() => { placeholder: "Something went wrong!" })
                console.log('Something went wrong getting music', error)
                return error;
            })

    }

    saveTagsHandler = () => {
        this.setState({savedTags: 'loading'})

        const trackTags = Object.entries(this.props.tags).map(
            track => ({
                id: [track[0]],
                tags: track[1].map(tag => tag.value)
            })
        ).reduce((obj, item) => ({
            ...obj,
            [item.id]: item.tags
        }), {})

        const data = {
            trackTags: trackTags,
            user: this.props.username
        }


        axios.post('/api/tagTracks/', data, {
            headers: {
                "Content-Type": "application/json",
                "X-CSRFToken": cookies.get("csrftoken"),
            },
            credentials: "same-origin"
        })
            .then(res => {
            this.setState({savedTags: true})

                console.log(res);

                })
            .catch(err => {
                console.log('Something went wrong tagging tracks:', err)
            })
    }

    render() {
        let items = null;
        if (this.state.retrieveTokensError) {
            items = <ErrorMsg details={this.state.retrieveTokensError} action="Retrieving auth token"/>
        }
        else if (!this.props.tokens.authToken) {
            items = <Welcome/>;
        }
        else if (this.props.tokens.authToken && !this.props.musicData[this.props.typeActive]) {
            items = <Spinner />
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

        let tagState = null;
        if (this.state.savedTags === 'loading') {
            tagState = <MiniSpinner />
        }
        else if (this.state.savedTags) {
            tagState = 'Saved!'
        }
        else if (!this.state.savedTags) {
            tagState = null
        }

        return (
            <div>
                <div className={styles.Home__controls}>
                    <Filters setActive={(type) => this.props.onSetTypeActive(type)} currentActive={this.props.typeActive} />
                    <div className={styles.Home__controls__input}>
                        <input placeholder="my tag!" className={styles.TagSource} value={this.props.tagSource} onChange={(event) => this.props.onChangeTagSource(event.target.value)} />
                        <Button clicked={this.saveTagsHandler}>Save</Button>
                        {tagState}
                    </div>
                </div>
                <div className={styles.Home__music}>
                    {items}
                </div>
            </div >
        );
    };
}

const mapStateToProps = state => {
    return {
        tokens: state.auth.tokens,
        username: state.auth.username,
        displayName: state.auth.displayName,
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
        onLogin: (token) => dispatch(actions.login(token)),
        onLogout: () => dispatch(actions.logout()),
        onRetrieveTags: (username) => dispatch(actions.retrieveTags(username))
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(Home);