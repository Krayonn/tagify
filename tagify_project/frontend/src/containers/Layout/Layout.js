import React, { Component } from 'react';
import styles from './Layout.module.scss';
import { connect } from 'react-redux';

import Toolbar from '../../components/Toolbar/Toolbar';
import * as actions from '../../store/actions/index';

class Layout extends Component {


    render() {

        return (
            <div className={styles.Layout__logo}>
                <Toolbar logout={this.props.onLogout} isAuth={this.props.authenticated}/>
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