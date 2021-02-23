import Cell from './Cell';
import './Grid.css';

function Grid({currentGeneration}) {
  return (
    <div className="Grid">
      {currentGeneration.map((row) => {
        return (
          <div className="Grid-row">
            {row.map((cell, index) => {
              return <Cell key={index} value={cell} />;
            })}
          </div>
        );
      })}
    </div>
  );
}

export default Grid;
