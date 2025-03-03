import React from 'react';

// import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import styles from './SideDrawer.module.scss';
import Backdrop from '../../UI/Backdrop/Backdrop';

const sideDrawer = ( props ) => {
    let attachedStyles = [styles.SideDrawer, styles.Close];
    if (props.open) {
        attachedStyles = [styles.SideDrawer, styles.Open];
    }
    return (
        <React.Fragment>
            <Backdrop show={props.open} clicked={props.closed}/>
            <div className={attachedStyles.join(' ')} onClick={props.closed}>
                <div className={styles.Logo}>
                    <p>LOGO</p>
                </div>
                <nav>
                    <NavigationItems isAuthenticated={props.isAuth} />
                </nav>
            </div>
        </React.Fragment>
    );
};

export default sideDrawer;