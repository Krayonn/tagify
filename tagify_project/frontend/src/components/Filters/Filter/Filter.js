import React from 'react';
import styles from './Filter.module.scss';

const filter = (props) => {
    let activeStyle = {
        backgroundColor: "$sand",
        borderBottom: "4px solid #40A4C8",
        color: "$light-black"
    }

    return (
        <div
            className={props.active ? styles.Filter+' '+styles.Filter__active : styles.Filter}
            onClick={props.clicked}>
            {props.children}
        </div>

    )
}

export default filter