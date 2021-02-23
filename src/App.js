import logo from './logo.svg';
import World from './World'
import './App.css';

const createWorld = () => {
  // create a new world
  // const world = new World(20, 20);
  // let currentGrid = world.getFirstGeneration();
  // world.printCurrentGeneration();
  console.log('test');
} 

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <button onClick={createWorld}>Next generation</button>
      </header>
    </div>
  );
}

export default App;
