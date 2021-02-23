// todo find out how to reduce spaces in GitHub visualization

// create a new world
const world = new World(20, 20);
let currentGrid = world.getFirstGeneration();
world.printCurrentGeneration();

// create a new generation with each click
document.getElementById('next-generation').addEventListener('click', () => {
	const nextGrid = world.getNextGeneration(currentGrid);
	// replace the old generation with the new values
	currentGrid = nextGrid;
	world.printCurrentGeneration();
});
