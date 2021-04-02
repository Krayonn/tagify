import React, { Component } from 'react';
import styles from './Layout.module.scss';
import { connect } from 'react-redux';

import Toolbar from '../../components/Toolbar/Toolbar';
import SideDrawer from '../../components/Toolbar/SideDrawer/SideDrawer';
import * as actions from '../../store/actions/index';

class Layout extends Component {
    state = {
        showSideDrawer: false
    }

    sideDrawerClosedHandler = () => {
        this.setState( { showSideDrawer: false } );
    }

    sideDrawerToggleHandler = () => {
        this.setState( ( prevState ) => {
            return { showSideDrawer: !prevState.showSideDrawer };
        } );
    }

    render() {

        return (
            <div className={styles.Layout__logo}>
                <Toolbar logout={this.props.onLogout} isAuth={this.props.authenticated} drawerToggleClick={this.sideDrawerToggleHandler}/>
                <SideDrawer
                    open={this.state.showSideDrawer}
                    closed={this.sideDrawerClosedHandler} />
                <main className={styles.Content} >
                    {this.props.children}
                </main>
            </div>

        )
    }
}

const mapStateToProps = state => {
    return {
        authenticated: state.auth.authenticated,
        username: state.auth.username
    }

}
const mapDispatchToProps = dispatch => {
    return {
        onLogout: () => dispatch(actions.logout())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Layout);