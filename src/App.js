import React, { useState, useEffect } from 'react';
import World from './World'
import './App.css';

// todo find out how to reduce spaces in GitHub visualization

const world = new World(20, 20);

function App() {
  // Declare a new state variable, which we'll call "count"
  const [grid, setGrid] = useState([]);
  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    setGrid(world.getFirstGeneration());
    world.printCurrentGeneration();
  }, []);
  const createWorld = () => {
    const nextGrid = world.getNextGeneration(grid);
	  // replace the old generation with the new values
	  setGrid(nextGrid);
	  world.printCurrentGeneration();
  } 
  return (
    <div className="App">
      <header className="App-header">
        <button onClick={createWorld}>Next generation</button>
      </header>
    </div>
  );
}

export default App;
