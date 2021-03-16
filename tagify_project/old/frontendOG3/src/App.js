import React, { Component } from "react";
import { render } from "react-dom";
import {Route, Switch } from 'react-router-dom';

import Auth from './components/auth/Auth';
import Pizza from './containers/Pizza';

class App extends Component {

    state = {
        data: [],
        loaded: false,
        placeholder: "Loading"
    }



    componentDidMount() {
        fetch("api/lead")
            .then(response => {
                if (response.status > 400) {
                    return this.setState(() => {
                        return { placeholder: "Something went wrong!" };
                    });
                }
                return response.json();
            })
            .then(data => {
                this.setState(() => {
                    return {
                        data,
                        loaded: true
                    };
                });
            });
    }

    render() {
        return (
            <div>
                <h1>Hello there!!!</h1>
                <ul>
                    {this.state.data.map(contact => {
                        return (
                            <div>
                                <Switch>
                                    <Route component={Auth} path='/auth'/>
                                    <Route component={Auth} path='/'/>
                                </Switch>
                                <Auth clicked={this.authHandler} />
                                <li key={contact.id}>
                                    {contact.name} - {contact.email}
                                </li>
                                <Pizza/>
                            </div>
                        );
                    })}
                </ul>
            </div>

        );
    }
}

export default App;

const container = document.getElementById("app");
render(<App />, container);