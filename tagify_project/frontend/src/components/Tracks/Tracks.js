import React from 'react';
import styles from './Tracks.module.scss';
import Track from '../../containers/Track/Track';

const tracks = (props) => {


    let tracks = null;
    if (props.tracks) {
        tracks = (
            props.tracks.map(track => {
                const image64 = track.images ? track.images.find(i => i.height === 64).url : null;
                return (
                    <Track
                        key={track.id}
                        id={track.id}
                        name={track.title}
                        trackNumber={track.track_number}
                        tags={track.tags}
                        clicked={props.addTag}
                        artists={track.artists.join(', ')}
                        image={image64} />
                )
            })
        )
    }
    return (
        <div className={styles.tracks} >
            {tracks}
        </div>

    )
}

export default tracks