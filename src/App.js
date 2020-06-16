import React from "react";
import "./App.css";

// Components
import Whiteboard from "components/whiteboard";
import Toolbar from "components/toolbar";

// Store
import store from "store";

// React Redux
import { Provider } from "react-redux";

function App() {

  return (
    <Provider store={store}>
      <div className="App">
        <Toolbar />
        <Whiteboard width={"100%"} height={"100%"} />
      </div>
    </Provider>
  );
}

export default App;
