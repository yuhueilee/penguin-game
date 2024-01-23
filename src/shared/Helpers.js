export const RandomInt = (min, max) => {
  // Ensure that min and max are integers
  min = Math.ceil(min);
  max = Math.floor(max);

  // Generate a random number between min and max (inclusive)
  const randomNum = Math.floor(Math.random() * (max - min + 1)) + min;

  return randomNum;
};

export const RandomIntArray = (min, max, length) => {
  const randomIntArray = [];

  for (let i = 0; i < length; i++) {
    const randomNum = RandomInt(min, max);

    randomIntArray.push(randomNum);
  }

  return randomIntArray;
}