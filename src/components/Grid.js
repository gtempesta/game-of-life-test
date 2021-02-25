import Cell from './Cell';
import './Grid.css';

function Grid({currentGeneration, updateCell, isDrawing, setIsDrawing, isRunning}) {
  const startDrawing = () => {
    setIsDrawing(true);
  }
  const finishDrawing = () => {
    setIsDrawing(false);
  }
  return (
    <div className={`Grid ${(isDrawing ? 'Grid-drawing' : '')} ${(isRunning ? 'Grid-running' : '')}`}
      onMouseDown={startDrawing}
      onTouchStart={startDrawing}
      onMouseUp={finishDrawing}
      onTouchEnd={finishDrawing}
    >
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
