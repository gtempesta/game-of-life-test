import './Cell.css';

function Cell({value}) {
  const isAlive = value === 1;
  return (
    <span className={`Cell ${(isAlive ? 'Cell-alive' : '')}`}></span>
  );
}

export default Cell;
