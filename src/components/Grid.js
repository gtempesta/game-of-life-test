import Cell from './Cell';
import './Grid.css';

function Grid({currentGeneration, updateCell, drawing, setDrawing}) {
  const startDrawing = () => {
    setDrawing(true);
  }
  const finishDrawing = () => {
    setDrawing(false);
  }
  return (
    <div className="Grid"
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
                  drawing={drawing}
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
