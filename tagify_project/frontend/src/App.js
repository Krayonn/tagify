import React, { Component } from "react";
import { render } from "react-dom";
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Auth from './components/auth/Auth';

class App extends Component {

  state = {
    data: [],
    loaded: false,
    placeholder: "Loading"
  }


  // componentDidMount() {
  //   fetch("api/lead")
  //     .then(response => {
  //       if (response.status > 400) {
  //         return this.setState(() => {
  //           return { placeholder: "Something went wrong!" };
  //         });
  //       }
  //       return response.json();
  //     })
  //     .then(data => {
  //       this.setState(() => {
  //         return {
  //           data,
  //           loaded: true
  //         };
  //       });
  //     });
  // }

  render() {
    return (
      <BrowserRouter>
        <div>
          <h1>Hello there!</h1>
          <Switch>
            <Route path="/" component={Auth} />
          </Switch>
          {/* <ul>
            {this.state.data.map(contact => {
              return (
                <div>
                  <li key={contact.id}>
                    {contact.name} - {contact.email}
                  </li>
                </div>
              );
            })}
          </ul> */}
        </div>
      </BrowserRouter>

    );
  }
}

export default App;

// const container = document.getElementById("app-container");
// render(<App />, container);