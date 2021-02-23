// return a random 0 or 1 value
const getRandomState = (width, height) => {
  const min = 0;
  const max = 1;
  // The maximum is inclusive and the minimum is inclusive
  return Math.floor(Math.random() * (max - min + 1) + min);
}
export default getRandomState;
