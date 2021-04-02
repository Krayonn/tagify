import React from 'react';
import styles from './Playlists.module.scss';
import Playlist from './Playlist/Playlist';

const playlists = (props) => {

    let playlists = null;
    if (props.playlists) {

        playlists = (
            props.playlists.map(playlist => {
                const image640 = playlist.images.find(i => i.height === 640 || !i.height).url
                return (
                    <Playlist
                        key={playlist.id}
                        id={playlist.id}
                        name={playlist.name}
                        image={image640}
                        tracks={playlist.tracks}
                    />
                )
            })
        )
    }
    return (
        <div>
            {playlists}
        </div>

    )
}

export default playlists