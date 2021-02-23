// todo probably the inner grid is not needed
import create2DArray from '../utils/create2DArray';
import getRandomState from '../utils/getRandomState';

class World {
	constructor(width, height) {
		this.width = width;
		this.height = height;
		this.grid = create2DArray(this.width, this.height);
	}

	// return a new grid with random paramters
	computeRandomGrid(grid) {
		// start by filling the currentState with random values
		const currentGrid = grid.map((row) => {
			return row.map(() => {
				return getRandomState();
			})
		});

		return currentGrid;
	}

	// count living neighbours around a cell
	countLivingNeighbours(grid, x, y) {
		// x and y are the i and j of the other loop
		let sum = 0;
		let neighboursCount = 0;
		for (let i = -1; i < 2; i += 1) {
			for (let j = -1; j < 2; j += 1) {
				// if we are at the edges, the value would be undefined
				// since we are counting living cells, we can count undefined as 0
				const value = grid?.[x + i]?.[y + j] ?? 0;
				// we exclude current cell (when both indices are at 0)
				const isCurrentCell = i === 0 && j === 0;
				if (!isCurrentCell) {
					// console.log('neighbours cells are', value);
					sum += value;
					neighboursCount += 1;
				} else {
					// console.log('current cell is', value);
				}
			}
		}
		// console.log(neighboursCount);
		return sum;
	};

	// compute a generation based on the parameter
	computeNextGeneration(currentGrid) {
		// loop through current array and count the neighbours
		// and while doing it update the next array with the correct values
		const nextGrid = currentGrid.map((row, i) => {
			return row.map((cell, j) => {
				const currentState = cell;
				const isAlive = cell === 1;
				// count live neighbours
				const neighbours = this.countLivingNeighbours(currentGrid, i, j);
				// console.log('total neighbours for cell: ', neighbours);
	
				// if is dead
				if (!isAlive && neighbours === 3) {
					// cell will come to life if neighbours are exactly 3
					return 1;
				} else if (isAlive && (neighbours < 2 || neighbours > 3)) {
					// cell will die if population is fewer than 2 or more than 3
					return 0;
				} else {
					// all other cells inherit from current state
					return currentState;
				}
			});
		});
		
		// used to test old implementation against the new one
		// console.log(JSON.stringify(nextGrid) === JSON.stringify(nextGrid2));
		return nextGrid;
	}

	computeSingleCellUpdate(coordinates, value) {
		const {x, y} = coordinates;
		// create a new grid to help react detect the difference
		const newGrid = JSON.parse(JSON.stringify(this.grid));
		newGrid[x][y] = value;
		return newGrid;
	}

	// compute a random grid and return it 
	getFirstGeneration() {
		this.grid = this.computeRandomGrid(this.grid);
		return this.grid;
	}

	// compute next generation based on the parameter and return it
	getNextGeneration(currentGrid) {
		// compute next generation based on a state that's passed from outside
		// it can be easily changed to compute based on inner state
		this.grid = this.computeNextGeneration(currentGrid);
		return this.grid;
	}

	getUpdatedGeneration(coordinates, value) {
		// return a new array with only this value updated
		// otherwise react won't detect the difference
		this.grid = this.computeSingleCellUpdate(coordinates, value);
		return this.grid;
	}

	// print current state
	printCurrentGeneration() {
		console.table(this.grid);
	}
}

export default World;