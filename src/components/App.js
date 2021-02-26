import React, { useState, useEffect, useRef } from 'react';
import World from '../classes/World';
import Grid from './Grid';
import './App.css';

// todo add a screenshot to the readme file

function App() {
  // state variables
  const [grid, setGrid] = useState([]);
  
  // timer variables
  const [timer, setTimer] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const countRef = useRef(null);

  // class to compute the grids
  const [world] = useState(() => {
    // using a callback to prevent the class from being initialized with every render
    // https://stackoverflow.com/a/64131447/
    return new World(40, 40);
  });

  // drawing state lets us interact with the grid on drag
  const [isDrawing, setIsDrawing] = useState(false);
  
  // only executed when `world` is updated
  useEffect(() => {
    setGrid(world.getFirstGeneration());
    // world.printCurrentGeneration();
  }, [world]);
  
  // compute a new generation based on the current one
  const handleNextGeneration = () => {
    const nextGrid = world.getNextGeneration(grid);
    // replace the old generation with the new values
    setGrid(nextGrid);
    // update timer
    setTimer((timer) => {
      return timer + 1;
    });
  }

  // update a single cell in the current grid
  const updateCell = (coordinates, value) => {
    if (!isRunning) {
      // only update if not running
      const updatedGrid = world.getUpdatedGeneration(coordinates, value);
      setGrid(updatedGrid);
    }
  }
  const handleStart = () => {
    // based on https://dev.to/abdulbasit313/how-to-develop-a-stopwatch-in-react-js-with-custom-hook-561b
    // it's not easy to manage the state inside setInterval 
    // but luckily the useState hook is passing the current state
    // so we can use it to compute its next state (in both setTimer and setGrid)
    setIsRunning(true);
    countRef.current = setInterval(() => {
      setTimer((timer) => {
        // add one to current timer
        return timer + 1;
      });
      setGrid((grid) => {
        // compute next generation based on the current one
        const nextGrid = world.getNextGeneration(grid);
        return nextGrid;
      });
    }, 40);
  }

  const handlePause = () => {
    // stop and clear the timer
    clearInterval(countRef.current);
    setIsRunning(false);
  }

  const handleClear = () => {
    // stop, clear the timer, set count to 0 and generate a new random state
    clearInterval(countRef.current);
    setTimer(0);
    setIsRunning(false);
    setGrid(world.getFirstGeneration());
  }

  // any mouse up will set isDrawing to false
  const handleMouseUp = () => {
    setIsDrawing(false);
  }

  return (
    <div className="App" onMouseUp={handleMouseUp}>
      <main className="App-main">
        <h1>Conway's Game of Life</h1>
        <Grid
          currentGeneration={grid}
          updateCell={updateCell}
          isDrawing={isDrawing}
          setIsDrawing={setIsDrawing}
          isRunning={isRunning}
        />
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
          <p className="iterations">Generations: {timer}</p>
          <div className="explanation">
            <p>Tips:</p>
            <ul>
              <li>Click on a cell if you want to flip its state</li>
              <li>Click and drag the mouse if you want to give life to specific cells (only on desktop)</li>
            </ul>
            <small>(only when the simulation is not running )</small></div>
        </div>
      </main>
    </div>
  );
}

export default App;
