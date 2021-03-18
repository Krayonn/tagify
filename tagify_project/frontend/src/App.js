import React, { Component } from "react";
import { render } from "react-dom";
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { combineReducers, createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import Home from './containers/Home/Home';
import Layout from './containers/Layout/Layout';
import CreatePlaylist from "./components/CreatePlaylist/CreatePlaylist";
import authReducer from './store/reducers/auth'
import musicReducer from './store/reducers/music'
import tagReducer from './store/reducers/tag'


const composeEnhancers = process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null || compose;
// const composeEnhancers = null || compose;

const rootReducer = combineReducers({
  auth: authReducer,
  tag: tagReducer,
  music: musicReducer
});

const store = createStore(rootReducer, composeEnhancers(
  applyMiddleware(thunk) 
));

class App extends Component {

  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <Layout>
            <Switch>
              <Route path="/createPlaylist" component={CreatePlaylist} />
              <Route path="/" component={Home} />
            </Switch>
          </Layout>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;

const container = document.getElementById("app-container");
render(<App />, container);