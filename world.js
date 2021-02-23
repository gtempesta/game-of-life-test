class World {
	constructor(width, height) {
		this.width = width;
		this.height = height;
		this.currentGrid = this.create2DArray(this.width, this.height);
	}

	create2DArray(width, height) {
		// return Array(width).fill().map(()=>Array(height).fill(0))
		return [...new Array(width)].map(() => [...new Array(height)].map(() => 0));
	}

	logGrid() {
		console.log(this.currentGrid, 'from class!');
	}

}

// create a new world
const world = new World(20, 20);
world.logGrid();
