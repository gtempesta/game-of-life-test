// function to create an empty 2D array given width and height
const create2DArray = (width, height) => {
  // return Array(width).fill().map(()=>Array(height).fill(0))
  return [...new Array(width)].map(() => [...new Array(height)].map(() => 0));
}
export default create2DArray;
