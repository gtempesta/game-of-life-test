// reduce

const width = 10;
const height = 10;

const create2DArray = (width, height) => {
	// return Array(width).fill().map(()=>Array(height).fill(0))
	return [...new Array(width)].map(() => [...new Array(height)].map(() => 0));
};

const getRandomState = () => {
	const min = 0;
  	const max = 1;
	return Math.floor(Math.random() * (max - min + 1) + min); // The maximum is inclusive and the minimum is inclusive
};

const countLivingNeighbours = (grid, x, y) => {
	// x and y are the i and j of the other loop
	let sum = 0;
	let neighboursCount = 0;
	for (let i = -1; i < 2; i += 1) {
		for (let j = -1; j < 2; j += 1) {
			const isCurrentCell = i == 0 && j == 0;
			// if we are at the edges, the value would be undefined
			// since we are counting living cells, we can count undefined as 0
			const value = grid?.[x + i]?.[y + j] ?? 0;
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

let currentGrid;
let nextGrid;

const setup = () => {
	// empty matrix
	const empty = create2DArray(width, height);

	// next is empty
	nextGrid = [...empty];

	// start by filling the currentState with random values
	currentGrid = empty.map((row) => {
		return row.map(() => {
			return getRandomState();
		})
	});

	console.table(nextGrid);
	console.table(currentGrid);
}

const computeNextGeneration = () => {
	// loop through current array and count the neighbours
	// and while doing it update the next array with the correct values
	for (let i = 0; i < width; i += 1) {
		for (let j = 0; j < height; j += 1) {
			const currentState = currentGrid[i][j];
			const isAlive = currentState === 1;
			// count live neighbours
			const neighbours = countLivingNeighbours(currentGrid, i, j);
			// console.log('total neighbours for cell: ', neighbours);

			// all cells inherit from current state
			nextGrid[i][j] = currentState;

			// if is dead
			if (!isAlive) {
				if (neighbours === 3) {
					// cell will come to life if neighbours are exactly 3
					nextGrid[i][j] = 1;
				}
			}

			// if is alive
			if (isAlive) {
				if (neighbours < 2 || neighbours > 3) {
					// cell will die if population is fewer than 2 or more than 3
					nextGrid[i][j] = 0;
				}
			}
		}
	}

	// update currentGrid with data from nextGrid
	currentGrid = nextGrid;
	console.table(currentGrid);
}

setup();
