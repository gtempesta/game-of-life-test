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
	// The maximum is inclusive and the minimum is inclusive
	return Math.floor(Math.random() * (max - min + 1) + min);
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

const setup = () => {
	// empty matrix
	const empty = create2DArray(width, height);

	// start by filling the currentState with random values
	currentGrid = empty.map((row) => {
		return row.map(() => {
			return getRandomState();
		})
	});

	console.table(currentGrid);
}

const computeNextGeneration = () => {
	// todo figure out how to pass currentGrid as a parameter

	// loop through current array and count the neighbours
	// and while doing it update the next array with the correct values
	const nextGrid = currentGrid.map((row, i) => {
		return row.map((cell, j) => {
			const currentState = cell;
			const isAlive = cell === 1;
			// count live neighbours
			const neighbours = countLivingNeighbours(currentGrid, i, j);
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

	currentGrid = nextGrid;
	console.table(currentGrid);

	// used to test old implementation against the new one
	// console.log(JSON.stringify(nextGrid) === JSON.stringify(nextGrid2));
}

setup();


document.getElementById('next-generation').addEventListener('click', () => {
	computeNextGeneration();
});
