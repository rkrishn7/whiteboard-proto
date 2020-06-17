import React from "react";
import "./App.css";

// Routes
import Whiteboard from "routes/whiteboard";
import Landing from "routes/landing";

// Store
import store from "store";

// React Redux
import { Provider } from "react-redux";

// React Router
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

function App() {

  return (
    <Provider store={store}>
      <Router>
        <Switch>
            <Route exact path="/">
              <Landing />
            </Route>
            <Route path="/whiteboard">
              <Whiteboard />
            </Route>
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
