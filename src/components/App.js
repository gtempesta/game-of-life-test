import React, { useState, useEffect, useRef } from 'react';
import World from '../classes/World';
import Grid from './Grid';
import './App.css';

// todo create new file for world copying from this one in order to keep the same
// indentation

function App() {
  // state variables
  const [grid, setGrid] = useState([]);
  const [cellQuantity] = useState(40);
  
  // timer variables
  const [timer, setTimer] = useState(0)
  const [isRunning, setIsRunning] = useState(false);
  const countRef = useRef(null);

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
  
  const handleNextGeneration = () => {
    const nextGrid = world.getNextGeneration(grid);
    // replace the old generation with the new values
    setGrid(nextGrid);
    // update timer
    setTimer((timer) => {
      return timer + 1;
    });
  }
  const updateCell = (coordinates, value) => {
    if (!isRunning) {
      // only update if not running
      const updatedGrid = world.getUpdatedGeneration(coordinates, value);
      setGrid(updatedGrid);
    }
  }
  const handleStart = () => {
    setIsRunning(true);
    countRef.current = setInterval(() => {
      setTimer((timer) => {
        return timer + 1;
      });
      setGrid((grid) => {
        const nextGrid = world.getNextGeneration(grid);
        return nextGrid;
      });
    }, 100);
  }

  const handlePause = () => {
    clearInterval(countRef.current);
    setIsRunning(false);
  }

  const handleClear = () => {
    clearInterval(countRef.current);
    setTimer(0);
    setIsRunning(false);
    setGrid(world.getFirstGeneration());
  }

  const formatTime = () => {
    return timer.toString();
  }

  return (
    <div className="App">
      <main className="App-main">
        <h1>Conway's Game of Life</h1>
        <Grid currentGeneration={grid} updateCell={updateCell} />
        <div className="App-controls">
          <h2>Controls</h2>
          <div className="App-controls-row">
            <button onClick={handleStart}>Run</button>
            <button onClick={handlePause}>Stop</button>
          </div>
          <div className="App-controls-row">
            <button onClick={handleNextGeneration} disabled={isRunning}>Next generation</button>
          </div>
          <div className="App-controls-row">
            <button onClick={handleClear} disabled={isRunning}>New Random Generation</button>
          </div>
          <p className="iterations">Generations: {formatTime()}</p>
          <p className="explanation">Click on a cell while the simulation is not running if you want to flip its state</p>
        </div>
      </main>
    </div>
  );
}

export default App;
