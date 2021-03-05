import React, { Component } from 'react';
import scssStyles from './Layout.module.scss';

import logo from '../../assets/logo.png'
class Layout extends Component {


    render() {

        return (
            <div>
                <div className={scssStyles.Layout}>
                    <div className={scssStyles.Layout__logo}>
                        {/* <img src={logo} alt="tag that bitch" /> */}
                        <h1>TAGIFY</h1>
                    </div>
                </div>
            </div>

        )
    }
}

export default Layout