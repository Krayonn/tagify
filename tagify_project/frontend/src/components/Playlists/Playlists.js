import React from 'react';
import scssStyles from './Playlists.module.scss';
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
            <div className={scssStyles.tracks}>
                {playlists}
                <div className={scssStyles.track}>
                </div>
            </div>
        </div>

    )
}

export default playlists