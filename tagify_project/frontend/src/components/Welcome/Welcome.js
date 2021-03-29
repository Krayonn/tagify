import React from 'react';
import styles from './Welcome.module.scss';

const welcome = (props) => {
    return (
        <div className={styles.Welcome}>
            <div className={styles.Welcome__text}>
                <p>Welcome to Tagify!</p>
                <p>Please log in via Spotify using the button above</p>    
            </div>
            {/* <img src={require('../../assets/sound-wave.png')} /> */}
            <img src={"/static/sound-wave.png"} />
        </div>
    )
}

export default welcome