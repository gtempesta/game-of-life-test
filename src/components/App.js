import React, { useState, useEffect } from 'react';
import World from '../classes/World';
import Grid from './Grid';
import './App.css';

// todo create new file for world copying from this one in order to keep the same
// indentation

function App() {
  // state variables
  const [grid, setGrid] = useState([]);
  const [cellQuantity] = useState(40);
  const [world] = useState(() => {
    // using a callback to prevent the class from being initialized with every render
    // https://stackoverflow.com/a/64131447/
    return new World(cellQuantity, cellQuantity);
  });
  // only executed when `world` is updated
  useEffect(() => {
    setGrid(world.getFirstGeneration());
    // world.printCurrentGeneration();
  }, [world]);
  const createNextGeneration = () => {
    const nextGrid = world.getNextGeneration(grid);
    // replace the old generation with the new values
    setGrid(nextGrid);
    // world.printCurrentGeneration();
  }
  const updateCell = (coordinates, value) => {
    const updatedGrid = world.getUpdatedGeneration(coordinates, value);
    setGrid(updatedGrid);
    // world.printCurrentGeneration();
  }
  return (
    <div className="App">
      <main className="App-main">
        <h1>Conway's Game of Life</h1>
        <Grid currentGeneration={grid} updateCell={updateCell} />
        <button onClick={createNextGeneration}>Next generation</button>
      </main>
    </div>
  );
}

export default App;
