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
      updateCell(coords, 1);
    }
  }
  const handleTouchMove = () => {
    updateCell(coords, 1);
  }
  return (
    <span
      className={`Cell ${(isAlive ? 'Cell-alive' : '')}`}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onTouchMove={handleTouchMove}
      >
    </span>
  );
}

export default Cell;
