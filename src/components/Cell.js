import './Cell.css';

function Cell({value, updateCell, coords, isDrawing}) {
  const isAlive = value === 1;
  const updateCellValue = () => {
    // this will flip the value
    const updatedValue = 1 - value;
    updateCell(coords, updatedValue);
  }
  const drawCell = () => {
    if (isDrawing) {
      updateCell(coords, 1);
    }
  }
  return (
    <span
      className={`Cell ${(isAlive ? 'Cell-alive' : '')}`}
      onClick={updateCellValue}
      onMouseEnter={drawCell}
      onTouchMove={drawCell}
      >
    </span>
  );
}

export default Cell;
