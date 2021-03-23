import React from 'react';
import styles from './ErrorMsg.module.scss';

const errorMsg = (props) => {
    const actionMsg = "Errored action: " + props.action
    const errorMsg = "Errored details: " + props.details
    return (
        <div className={styles.ErrorMsg}>
            <div className={styles.ErrorMsg__big}>
                <p style={{ fontSize: '100px' }}>&#128584;</p>
                <p>Uh oh... Something went wrong!</p>
            </div>
            <p>{actionMsg}</p>
            <p>{errorMsg}</p>
        </div>

    )
}

export default errorMsg