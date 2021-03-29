import React from 'react';
import styles from './ItemsControls.module.scss';

import Button from '../UI/Button/Button';

const itemsControls = (props) => {
    const pageOf = props.pageNumber + ' of ' + Math.max(...props.musicData[props.typeActive].map(i => i.page))
    return (
        <div className={styles.ItemsControls}>
            <Button
                disabled={props.pageNumber === 1}
                clicked={props.previous}>❮❮</Button>
            <p>{pageOf}</p>
            <Button
                disabled={props.pageNumber === Math.max(...props.musicData[props.typeActive].map(i => i.page))}
                clicked={props.next}>❯❯</Button>
        </div>

    )
}

export default itemsControls