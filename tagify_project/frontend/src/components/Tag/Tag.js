import React from 'react';
import styles from './Tag.module.scss';

const tag = (props) => {

    const tagColours = {
        red: styles.Tag__red,
        blue: styles.Tag__blue,
        green: styles.Tag__green,
        purple: styles.Tag__purple,
        orange: styles.Tag__orange,
    }

    return (
        <div className={styles.Tag + ' ' + tagColours[props.colour]}>
            {/* <div className={styles.Tag__name}>
                {props.tagName}
            </div> */}
            <div className={styles.Tag__name}>
                <input
                    value={props.tagName}
                    onChange={(event) => props.updateTag(event)}
                    style={{width: props.tagName.length * 8 +"px"}}
                    />
            </div>
            <div className={styles.Tag__delete} onClick={props.deleteTag}>
                x
            </div>
        </div>
    )
}

export default tag