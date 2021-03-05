import React, { Component } from 'react';

import Tracks from '../../Tracks/Tracks';
import scssStyles from './Album.module.scss';
import * as actions from '../../../store/action';

class Album extends Component {

    state = {
        showTracks: false
    }

    showTracksHandler = () => {
        this.setState({showTracks: !this.state.showTracks})
    }

    addTagHandler = () => {

    }

    render() {

        const year = this.props.releaseDate.substring(0, 4)
        let tracks = null;
        console.log('in album track props', this.props.tracks)
        if (this.state.showTracks) {
            tracks = (<Tracks tracks={this.props.tracks} showTracks={this.state.showTracks} />)
        }
        return (
            <div className={scssStyles.album}>
                <div className={scssStyles.album__info} onClick={this.showTracksHandler}>
                    <div className={scssStyles.album__info__art}>
                        <img src={this.props.image} alt={this.props.name} />
                    </div>
                    <div className={scssStyles.album__info__meta}>
                        <div className={scssStyles.album__year}>{year}</div>
                        <div className={scssStyles.album__name}>{this.props.name}</div>
                    </div>
                </div>
                {tracks}
            </div>
        )
    }
}

export default Album;