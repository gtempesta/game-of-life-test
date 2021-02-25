import Cell from './Cell';
import './Grid.css';

function Grid({currentGeneration, updateCell, isDrawing, setIsDrawing, isRunning}) {
  const handleMouseDown = () => {
    if (!isRunning) {
      // set isDrawing to true, only if isRunning is false
      setIsDrawing(true);
    }
  }
  return (
    <div className={`Grid ${(isDrawing ? 'Grid-drawing' : '')} ${(isRunning ? 'Grid-running' : '')}`}
      onMouseDown={handleMouseDown}>
      <div className="Grid-main">
        {currentGeneration.map((row, i) => {
          return (
            <div className="Grid-row" key={i}>
              {row.map((cell, j) => {
                return <Cell
                  key={`${i}-${j}`}
                  value={cell}
                  updateCell={updateCell}
                  coords={{x: i, y: j}}
                  isDrawing={isDrawing}
                />;
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Grid;
