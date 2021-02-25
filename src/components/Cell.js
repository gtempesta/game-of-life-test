import './Cell.css';

function Cell({value, updateCell, coords}) {
  const isAlive = value === 1;
  const updateCellValue = () => {
    // this will flip the value
    const updatedValue = 1 - value;
    updateCell(coords, updatedValue);
  }
  return (
    <span className={`Cell ${(isAlive ? 'Cell-alive' : '')}`} onClick={updateCellValue}>

    </span>
  );
}

export default Cell;
