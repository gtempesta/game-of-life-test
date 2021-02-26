# John Conway - The Game of life

![App screenshot](screen2.png)

You can see the live app here: https://game-of-life-test.netlify.app/

# Resources

- The main logic of the app was inspired by the video and the code in this page https://thecodingtrain.com/CodingChallenges/085-the-game-of-life.html. 

- The way in which the timer is configured comes from this tutorial: [How to develop a Stopwatch in React JS with custom hook](https://dev.to/abdulbasit313/how-to-develop-a-stopwatch-in-react-js-with-custom-hook-561b).

- In this SO answer [useState with `new` keyword as parameter](https://stackoverflow.com/a/64131447) I have found out how to declare a class in a functional React component.

# Reasoning

The current state of the cells is stored in a two-dimensional array. Every cell can be alive or dead. A dead cell will have a value of 0, while a living cell will have a value of 1. 

The first state of the application is computed with a random function that assigns a 0 or a 1 to each value in the two-dimensional array. 

Once we have created the array to store the state of all the cells we need to loop over all of them in order to compute the number of neighbors it has. 

![App screenshot](screen3.png)

In order to compute the number of the neighbors we need to loop around every cell from the index of -1, -1 to the index of 1, 1 relative to the cell that we are considering, remembering not to count the state of the cell itself.

The looping part is accomplished with two nested loops which go from one index to the next.

```javascript
for (let i = -1; i < 2; i += 1) {
  for (let j = -1; j < 2; j += 1) {
    // identify current cell in order to skip it later
    const isCurrentCell = i === 0 && j === 0;
    // do the rest
  }
}
```

We also need to be careful that there can be `undefined` indexes when we are looping close to the edges. 
Luckily there are two recent additions of ES6 which can help us: the nullish coalescence operator and the optional chaining operator. 

```javascript
const value = grid?.[x + i]?.[y + j] ?? 0;
```
In this way we are sure that the code won’t break when it finds `undefined` indexes and we can count `undefined` values as zeroes, because we are counting living cells (which count as 1). 

After we have counted the neighbors for each cell, the reasoning (based on Daniel Shiffman’s video) is the following: 
- passage from life to death: if a cell is alive, it will die if the number of neighbors is less than 2 or more than 3. 
- from death to life: if a cell is dead, it will come to life if it has exactly 3 neighbors
- all the other cells keep their state

Every new generation is computed based on the current generation, so it’s important to keep the current state unaltered while the code loops through it. This can be accomplished by keeping two variables with two separate arrays or by not mutating the original value. 

For example in the `computeNextGeneration` function the next generation is computed with a `map()` function (which does not mutate the original), while in the `getUpdatedGeneration` function the change is computed by cloning the original array and then updating only a single value in the new array. 

# Application structure

Class with cells\
Hooks in React\
State passed down to cells\
Methods defined in App

# Possible improvements

Touch functionality -> tried but needs more work\

Maybe with requestAnimationFrame would be better than setTimeout?



# How to run

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### Other Scripts
You can also run `npm run build` if you need an optimzed build for production. 

