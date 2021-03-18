import React from 'react';
import scssStyles from './ReadOnlyTag.module.scss';

const readOnlyTag = (props) => {

    const tagColours = {
        red: scssStyles.Tag__red,
        blue: scssStyles.Tag__blue,
        green: scssStyles.Tag__green,
        purple: scssStyles.Tag__purple,
        orange: scssStyles.Tag__orange,
    }

    return (
        <div className={scssStyles.Tag + ' ' + tagColours[props.colour]}>
            <div className={scssStyles.Tag__name}>
                {props.tagName}
            </div>
            <div className={scssStyles.Tag__delete} onClick={props.deleteTag}>
                
            </div>
        </div>
    )
}

export default readOnlyTag