import React from 'react';
import styles from './Tagify.module.scss';

const tagify = (props) => {
    return (
        <div className={styles.tagify}>
            <button onClick={props.clicked}>TAGIFY!</button>
        </div>

    )
}

export default tagify