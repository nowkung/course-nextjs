import React from 'react';
import logo from './logo.svg';
import './App.css';
import {Hi} from './Hi';


function App() {
  return (
    <>
      <div className="App">
        <Hi name="One" age={10} duration={1000} />

        <Hi name="Two" age={20} />

        <Hi name="Three" age={30} />

        {/* <label>Name:</label>
        <h1>Hello World</h1>

        <label>Name:</label>
        <h1>Hello Two</h1>

        <label>Name:</label>
        <h1>Hello Four</h1>

        <label>Name:</label>
        <h1>Hello Three</h1> */}
      </div>
    </>
  );
}

export default App;
