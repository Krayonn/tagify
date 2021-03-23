import React from 'react';

import styles from './Toolbar.module.scss';
import NavigationItems from './NavigationItems/NavigationItems';
import Button from '../UI/Button/Button';

const scopes = ['user-library-read','playlist-modify-private'];

const toolbar = ( props ) => {
    const authHandler = () => {
        const redirect = process.env.REDIRECT_URL;
        window.location.assign('https://accounts.spotify.com/authorize?client_id=803253b42a634b1ca7f1ce3cbd115b91&response_type=code&redirect_uri='+redirect+'&scope=' + scopes.join('%20') + '&state=oipxpoizxhpx');
    }
    const authButton = props.isAuth ? 
        <Button clicked={props.logout}>Logout</Button> :
        <Button clicked={authHandler}>Login with spotify</Button>

        
    return (
    <header className={styles.Toolbar}>

        <h1>Tagify!</h1>
        {authButton}
        <nav>
            <NavigationItems login={() => authHandler()} logout={props.logout} isAuth={props.isAuth}/>
        </nav>
    </header>
    )
};

export default toolbar;