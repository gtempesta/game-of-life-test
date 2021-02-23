import React, { useState, useEffect } from 'react';
import World from '../classes/World';
import Grid from './Grid';
import './App.css';

// todo create new file for world copying from this one in order to keep the same
// indentation

function App() {
  // Declare a new state variable, which we'll call "grid"
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
  const updateCell = (coordinates, value) => {
    console.log(coordinates, value);
    const updatedGrid = world.getUpdatedGeneration(coordinates, value);
    setGrid(updatedGrid);
    world.printCurrentGeneration();
  }
  return (
    <div className="App">
      <main className="App-main">
        <button onClick={createNextGeneration}>Next generation</button>
        <Grid currentGeneration={grid} updateCell={updateCell} />
      </main>
    </div>
  );
}

export default App;
