import React from 'react';
import styles from './Tracks.module.scss';
import trackStyles from '../../containers/Track/Track.module.scss'
import Track from '../../containers/Track/Track';

const tracks = (props) => {

    const headerTrack = (
        <Track
            key={0}
            id={0}
            name={"Name"}
            trackNumber={"#"}
            tags={""}
            artists={"Artists"}
        />
    )


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
            <div className={styles.tracks__heading}>
                <div className={styles.tracks__heading__number}>#</div>

                <div className={styles.tracks__heading__title}>Song</div>
                {/* <div className={trackStyles.track__title__artists__header}>Artists</div> */}

                {/* provides spacing.. */}
                <div className={styles.track__divider}></div>
                <div className={styles.tracks__heading__tags}>Tags</div>

            </div>
            {tracks}
        </div>

    )
}

export default tracks