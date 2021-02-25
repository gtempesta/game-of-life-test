import React, { useState, useEffect, useRef } from 'react';
import World from '../classes/World';
import Grid from './Grid';
import './App.css';

// todo add a screenshot to the readme file

function App() {
  // state variables
  const [grid, setGrid] = useState([]);
  
  // timer variables
  const [timer, setTimer] = useState(0)
  const [isRunning, setIsRunning] = useState(false);
  const countRef = useRef(null);

  const [world] = useState(() => {
    // using a callback to prevent the class from being initialized with every render
    // https://stackoverflow.com/a/64131447/
    return new World(40, 40);
  });

  // drawing state lets as interact with the grid on drag
  const [drawing, setDrawing] = useState(false);
  
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
    // based on https://dev.to/abdulbasit313/how-to-develop-a-stopwatch-in-react-js-with-custom-hook-561b
    // with setInterval it's not easy to manage the state
    // but luckily the useState hook is passing the current state
    // so we can use it to compute its next state (in both setTimer and setGrid)
    // -> logging the state inside setInterval (but outside the hooks) can give weird results
    // but we are correctly updating the values
    setIsRunning(true);
    countRef.current = setInterval(() => {
      setTimer((timer) => {
        return timer + 1;
      });
      setGrid((grid) => {
        // compute next generation based on the current one
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

  const finishDrawing = () => {
    setDrawing(false);
  }

  return (
    <div className="App" onMouseUp={finishDrawing} onTouchEnd={finishDrawing}>
      <main className="App-main">
        <h1>Conway's Game of Life</h1>
        <Grid currentGeneration={grid} updateCell={updateCell} drawing={drawing} setDrawing={setDrawing} />
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
          <p className="explanation">Click on a cell if you want to flip its state, or click and drag the mouse if you want to give life to specific cells <small>(only when the simulation is not running )</small></p>
        </div>
      </main>
    </div>
  );
}

export default App;
