import React from 'react';
import styles from './TagInput.module.scss';

const tagInput = (props) => {
    return (
        <input className={styles.TagSource} value={this.props.tagSource} onChange={(event) => this.props.onChangeTagSource(event.target.value)} />
    )
}

export default tagInput