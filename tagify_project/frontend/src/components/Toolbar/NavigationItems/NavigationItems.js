import React from 'react';
import { NavLink } from 'react-router-dom';

import styles from './NavigationItems.module.scss';

const navigationItems = (props) => {
    let authItem
    if (props.isAuth) {
        authItem = (
            <li className={styles.NavigationItem}>
                <NavLink
                    to="/"
                    onClick={props.logout}
                    exact>Logout</NavLink>
            </li>
        )
    } else {
        authItem = (
            <li className={styles.NavigationItem}>
                <NavLink
                    to="/login"
                    exact
                    activeClassName={styles.active}>Login</NavLink>
            </li>
        )
    }

    return (
        <ul className={styles.NavigationItems}>
            <li className={styles.NavigationItem}>
                <NavLink
                    to="/"
                    exact
                    activeClassName={styles.active}>Home</NavLink>
            </li>

            {authItem}

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