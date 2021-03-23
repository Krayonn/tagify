import React, { Component } from 'react';
import styles from './CreatePlaylist.module.scss';
import { connect } from 'react-redux';
import queryString from 'query-string';

import Spinner from '../../components/UI/Spinner/Spinner';
import Button from '../../components/UI/Button/Button';
import ReadOnlyTag from './ReadOnlyTag/ReadOnlyTag';
import * as actions from '../../store/actions/index';
import axios from '../../axios';
import Cookies from "universal-cookie";

const cookies = new Cookies();

class CreatePlaylist extends Component {
    state = {
        loading: false,
        selectedTags: [],
        playlistName: null
    }

    toggleHandler = (tag) => {
        if (this.state.selectedTags.includes(tag)) {
            const selectedTags = [...this.state.selectedTags].filter(atag => atag !== tag)
            this.setState({
                selectedTags: selectedTags
            })
        }
        else {
            this.setState({
                selectedTags: [...this.state.selectedTags, tag]
            })
        }
    }

    createPlaylistHandler = () => {
        const params = queryString.parse(this.props.location.search)
        this.setState({loading: true});
        axios.post('api/createPlaylist/?token=' + this.props.tokens.authToken,
        { chosenTags: this.state.selectedTags },
        {
            headers: {
                'Content-Type': 'application/json',
                "X-CSRFToken": cookies.get("csrftoken"),
                "Authorisation": this.props.tokens.authToken,
                "User": this.props.username
            },
            credentials: "same-origin"
        })
            .then(res => {
                this.setState({loading: false});
                this.setState({playlistName: res.data.playlist_name, playlistHref: res.data.playlist_url})
            })
            .catch(err => {
                console.log("Something went wrong creating the playlist: ",err)
            })
    }

    render() {
        let uniqueTags = Object.entries(this.props.tags).map(track => track[1]).flat()

        uniqueTags = uniqueTags.filter((tag, index, self) => self.findIndex(
            t => t.value === tag.value) === index)

        const tags = uniqueTags.map(tag => <ReadOnlyTag
            tagName={tag.value}
            colour={tag.colour}
            tagId={tag.id} />
        )

        const tagBoxes = uniqueTags.map(tag => (
            <div key={tag.value}>
                <label>
                    {tag.value}
                    <input type="checkbox" onChange={() => this.toggleHandler(tag.value)} />
                </label>
            </div>
        ))

        let item;
        if (this.state.loading) {
            item = <Spinner />
        }
        else if (this.state.playlistName) {
            item = (
                <div>
                    <p>Your playlist named {this.state.playlistName} has been created</p>
                    <a href={this.state.playlistHref} ><p>Click here to view it in Spotify</p></a>
                </div>
            )
        }
        return (
            <div className={styles.CreatePlaylist}>
                <p>Select the tags you want for your playlist</p>
                {tagBoxes}
                <p>Click here to create a new playlist!</p>
                <Button clicked={this.createPlaylistHandler}>Create</Button>
                {item}
            </div>
        )
    }

}

const mapStateToProps = state => {
    return {
        tokens: state.auth.tokens,
        username: state.auth.username,
        tags: state.tag.tags
    }

}

const mapDispatchToProps = dispatch => {
    return {
        onRetrieveTokens: (scope, authToken, refreshToken) => dispatch(actions.retrieveAuthTokens(scope, authToken, refreshToken)),
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(CreatePlaylist);