import React from 'react';
import logo from './logo.svg';
import './App.css';

// Components
import Whiteboard from "components/whiteboard";

function App() {
  return (
    <div className="App">
      <Whiteboard width={"90vw"} height={"90vh"} />
    </div>
  );
}

export default App;
