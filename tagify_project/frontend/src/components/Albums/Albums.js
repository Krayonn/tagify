import React from 'react';
import scssStyles from './Albums.module.scss';
import Album from './Album/Album';

const albums = (props) => {

    let albums = null;
    if (props.albums) {

        albums = (
            props.albums.map(album => {
                const image640 = album.images.find(i => i.height === 640 || !i.height).url
                return (
                    <Album
                        key={album.id}
                        id={album.id}
                        name={album.name}
                        artist={album.artist}
                        releaseDate={album.release_date}
                        image={image640}
                        tracks={album.tracks}
                        />
                )
            })
        )
    }
    return (
        <div>
            <div className={scssStyles.tracks}>
                {albums}
                <div className={scssStyles.track}>
                </div>
            </div>
        </div>

    )
}

export default albums