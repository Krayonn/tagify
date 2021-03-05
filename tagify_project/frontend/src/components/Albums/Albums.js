import React from 'react';
import scssStyles from './Albums.module.scss';
import Album from './Album/Album';

const albums = (props) => {

    console.log('the albums:',props.albums)
    let albums = null;
    if (props.albums) {

        albums = (
            props.albums.map(album => {
                let image640 = null;
                for (const image of album.images) {
                    if (image.height === 640) image640 = image.url 
                }
                return (
                    <Album
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