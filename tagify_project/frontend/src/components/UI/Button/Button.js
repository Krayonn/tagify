import React from 'react';
import styles from './Button.module.scss';

const button = (props) => {
    return (
        <button
            className={styles.Button}
            onClick={props.clicked}
            disabled={props.disabled}
        >{props.children}</button>
    )
}

export default button