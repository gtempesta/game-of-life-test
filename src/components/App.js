import React, { useState, useEffect } from 'react';
import World from '../classes/World';
import Grid from './Grid';
import './App.css';

// todo find out how to reduce spaces in GitHub visualization

function App() {
  // Declare a new state variable, which we'll call "count"
  const [grid, setGrid] = useState([]);
  const [world] = useState(() => {
    return new World(20, 20);
  });
  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    setGrid(world.getFirstGeneration());
    world.printCurrentGeneration();
  }, [world]);
  const createNextGeneration = () => {
    const nextGrid = world.getNextGeneration(grid);
    // replace the old generation with the new values
    setGrid(nextGrid);
    world.printCurrentGeneration();
  } 
  return (
    <div className="App">
      <main className="App-main">
        <button onClick={createNextGeneration}>Next generation</button>
        <Grid currentGeneration={grid} />
      </main>
    </div>
  );
}

export default App;
