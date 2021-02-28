// function to create an empty 2D array given width and height
const create2DArray = (width, height) => {
  // return Array(width).fill().map(()=>Array(height).fill(0))
  return [...new Array(height)].map(() => [...new Array(width)].map(() => 0));
}
export default create2DArray;
