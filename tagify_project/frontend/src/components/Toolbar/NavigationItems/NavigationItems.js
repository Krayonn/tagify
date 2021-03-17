import React from 'react';
import { NavLink } from 'react-router-dom';

import styles from './NavigationItems.module.scss';

const navigationItems = (props) => {


    return (
        <ul className={styles.NavigationItems}>
            <li className={styles.NavigationItem}>
                <NavLink
                    to="/"
                    exact
                    activeClassName={styles.active}>Home</NavLink>
            </li>

            <li className={styles.NavigationItem}>
                <NavLink
                    to="/createPlaylist"
                    exact
                    activeClassName={styles.active}>Create</NavLink>
            </li>
        </ul>

    );
}

export default navigationItems;