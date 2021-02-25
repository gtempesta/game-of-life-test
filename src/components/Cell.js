import './Cell.css';

function Cell({value, updateCell, coords, isDrawing}) {
  const isAlive = value === 1;
  const handleClick = () => {
    // this will flip the value
    const updatedValue = 1 - value;
    updateCell(coords, updatedValue);
  }
  const handleMouseEnter = () => {
    if (isDrawing) {
      // drag with the mouse clicked
      updateCell(coords, 1);
    }
  }
  return (
    <span
      className={`Cell ${(isAlive ? 'Cell-alive' : '')}`}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      >
    </span>
  );
}

export default Cell;
