import React, { Component } from 'react';

import Tracks from '../../Tracks/Tracks';
import styles from './Playlist.module.scss';

class Playlist extends Component {

    state = {
        showTracks: false
    }

    showTracksHandler = () => {
        this.setState({showTracks: !this.state.showTracks})
    }

    render() {

        let tracks = null;
        if (this.state.showTracks) {
            tracks = (<Tracks tracks={this.props.tracks} showTracks={this.state.showTracks} />)
        }
        return (
            <div className={styles.playlist}>
                <div className={styles.playlist__info} onClick={this.showTracksHandler}>
                    <div className={styles.playlist__info__art}>
                        <img src={this.props.image} alt={this.props.name} />
                    </div>
                    <div className={styles.playlist__info__meta}>
                        <div className={styles.playlist__name}>{this.props.name}</div>
                    </div>
                </div>
                {tracks}
            </div>
        )
    }
}

export default Playlist;