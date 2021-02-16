import React, { Component } from "react";
import { render } from "react-dom";

import Auth from './auth/Auth';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      data: [],
      loaded: false,
      placeholder: "Loading"
    };
  }

  // state = {
  //   data: [],
  //   loaded: false,
  //   placeholder: "Loading"
  // }

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
        <h1>Hello there</h1>
        <ul>
          {this.state.data.map(contact => {
            return (
              <div>
                <Auth/>
                <li key={contact.id}>
                  {contact.name} - {contact.email}
                </li>
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