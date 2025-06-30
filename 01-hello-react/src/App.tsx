import React from 'react';
import logo from './logo.svg';
import './App.css';



type Props = {
  name: string;
  age: number;
  duration?: number; // Optional prop
}

const Hi = ({ name, age, duration }: Props) => {
  return (
    <>
      <label>Name:</label>
      <h1>Hello {name}</h1>

      <label>Age:</label>
      <h1>{age}</h1>
    </>
  );
}

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
