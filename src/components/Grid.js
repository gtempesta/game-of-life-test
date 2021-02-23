import Cell from './Cell';
import './Grid.css';

function Grid({currentGeneration, updateCell}) {
  return (
    <div className="Grid">
      {currentGeneration.map((row, i) => {
        return (
          <div className="Grid-row" key={i}>
            {row.map((cell, j) => {
              return <Cell
                key={`${i}-${j}`}
                value={cell}
                updateCell={updateCell}
                coords={{x: i, y: j}}
              />;
            })}
          </div>
        );
      })}
    </div>
  );
}

export default Grid;