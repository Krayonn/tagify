import React from 'react';
import scssStyles from './Tag.module.scss';

const tag = (props) => {

    const tagColours = {
        red: scssStyles.Tag__red,
        blue: scssStyles.Tag__blue,
        green: scssStyles.Tag__green,
        purple: scssStyles.Tag__purple,
        orange: scssStyles.Tag__orange,
    }
    console.log('colour',props.colour)

    return (
        <div className={scssStyles.Tag + ' ' + tagColours[props.colour]}>
            {/* <div className={scssStyles.Tag__name}>
                {props.tagName}
            </div> */}
            <div className={scssStyles.Tag__name}>
                <input
                    value={props.tagName}
                    onChange={(event) => props.updateTag(event)}
                    style={{width: props.tagName.length * 8 +"px"}}/>
            </div>
            <div className={scssStyles.Tag__delete} onClick={props.deleteTag}>
                x
            </div>
        </div>
    )
}

export default tag