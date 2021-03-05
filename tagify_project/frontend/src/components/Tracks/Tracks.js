import React from 'react';
import scssStyles from './Tracks.module.scss';
import Track from './Track/Track';

const tracks = (props) => {

    let tracks = null;
    console.log('in tracks props', props)
    if (props.tracks) {
        tracks = (
            props.tracks.map(track => {
                return (
                    <Track
                        id={track.id}
                        name={track.title}
                        trackNumber={track.track_number}
                        tags={track.tags}
                        clicked={props.addTag} />
                )
            })
        )
    }
    return (
        <div>
            <div className={scssStyles.tracks} >
                {tracks}
            </div>
        </div>

    )
}

export default tracks