import React from 'react';
import styles from './Filters.module.scss';
import Filter from './Filter/Filter';

const filters = (props) => {
    return (
        <div>
            <div className={styles.Filters}>
                <Filter clicked={() => props.setActive("playlists")} active={props.currentActive === "playlists"} >Playlists</Filter>
                <Filter clicked={() => props.setActive("albums")} active={props.currentActive === "albums"}>Albums</Filter>
                <Filter clicked={() => props.setActive("tracks")} active={props.currentActive === "tracks"}>Tracks</Filter>
                {/* <Filter clicked={() => props.setActive("search")} active={props.currentActive === "search"}>Search</Filter> */}
            </div>
        </div>
    )
}

export default filters