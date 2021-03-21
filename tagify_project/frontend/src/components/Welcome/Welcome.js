import React from 'react';
import styles from './Welcome.module.scss';

const welcome = (props) => {
    return (
        <div className={styles.Welcome}>
            <div className={styles.Welcome__text}>
                <p>Welcome to tagify!</p>
                <p>Please log in via Spotify using the button above</p>    
                <p>Then tag the tracks with any custom tag and head to Create to create your new playlist</p>
            </div>
            {/* <img src={require('../../assets/sound-wave.png')} /> */}
            <img src={"/static/sound-wave.png"} />
        </div>
    )
}

export default welcome