import React, { Component } from 'react';
import styles from './Login.module.scss';
import { connect } from 'react-redux';

import axios from '../../axios';
import Cookies from "universal-cookie";
import * as actions from '../../store/actions/index';

const cookies = new Cookies();

class Login extends Component {
    state = {
        username: "",
        password: ""
    }

    updateUsernameHandler = (event) => {
        this.setState({ username: event.target.value })
    }

    updatePasswordHandler = (event) => {
        this.setState({ password: event.target.value })
    }

    isResponseOk(response) {
        if (response.status >= 200 && response.status <= 299) {
            return response;
        } else {
            throw Error(response.statusText);
        }
    }

    signUp = (event) => {
        event.preventDefault();
        axios.post("/auth/signup/",
            { username: this.state.username, password: this.state.password },
            {
                headers: {
                    "Content-Type": "application/json",
                    "X-CSRFToken": cookies.get("csrftoken"),
                },
                credentials: "same-origin"
            })
            .then(this.isResponseOk)
            .then(data => {
                console.log(data);
                this.setState({ isAuthenticated: true, username: "", password: "", error: "" });
                this.props.onLogin(this.state.username)
                this.props.history.push('/')
            })
            .catch(err => {
                console.log(err);
                this.setState({ error: "Username not available :(" });
            });
    }

    login = (event) => {
        event.preventDefault();
        axios.post("/auth/login/",
            { username: this.state.username, password: this.state.password },
            {
                headers: {
                    "Content-Type": "application/json",
                    "X-CSRFToken": cookies.get("csrftoken"),
                },
                credentials: "same-origin"
            })
            .then(this.isResponseOk)
            .then(data => {
                console.log('In log in', data);
                this.setState({ isAuthenticated: true, username: "", password: "", error: "" });
                this.props.onLogin(this.state.username)
                this.props.history.push('/')
            })
            .catch(err => {
                console.log(err);
                this.setState({ error: "Wrong username or password." });
            });
    }

    logout = () => {
        axios.get("/auth/logout",
            { credentials: "same-origin" })
            .then(this.isResponseOk)
            .then((data) => {
                console.log(data);
                this.setState({ isAuthenticated: false });
                this.props.onLogout()
            })
            .catch((err) => {
                console.log(err);
            });
    };

    render() {

        return (
            <div className={styles.Login}>
                <h1>Login</h1>
                <form onSubmit={this.login}>
                    <div className="form-group">
                        <label htmlFor="username">Username</label>
                        <input type="text" className="form-control" id="username" name="username" value={this.state.username} onChange={this.updateUsernameHandler} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="username">Password</label>
                        <input type="password" className="form-control" id="password" name="password" value={this.state.password} onChange={this.updatePasswordHandler} />
                        <div>
                            {this.state.error &&
                                <small className="text-danger">
                                    {this.state.error}
                                </small>
                            }
                        </div>
                    </div>
                    <button type="submit" className="btn btn-primary">Login</button>
                    <button type="button" className="btn btn-primary" onClick={this.signUp}>Sign up</button>
                </form>
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
        onLogin: (username) => dispatch(actions.login(username)),
        onLogout: () => dispatch(actions.logout())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);