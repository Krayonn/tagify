import React from 'react';

import styles from './Toolbar.module.scss';
// import Logo from '../../Logo/Logo';
import NavigationItems from './NavigationItems/NavigationItems';
// import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle';
import Button from '../UI/Button/Button';

const scopes = ['user-library-read','playlist-modify-private'];

const toolbar = ( props ) => {
    const authHandler = () => {
        const redirect = 'http://localhost:8000'
        // const redirect = 'http://localhost:8080'
        window.location.assign('https://accounts.spotify.com/authorize?client_id=803253b42a634b1ca7f1ce3cbd115b91&response_type=code&redirect_uri='+redirect+'&scope=' + scopes.join('%20') + '&state=sdfshgadsf');
    }
    return (
    <header className={styles.Toolbar}>
        {/* <DrawerToggle clicked={props.drawerToggleClicked} /> */}

        <h1>Tagifyyy</h1>
        <Button clicked={authHandler}>Login with spotify</Button>
        <nav>
            <NavigationItems logout={props.logout} isAuth={props.isAuth}/>
        </nav>
    </header>
    )
};

export default toolbar;