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

// PlayersScores returns the score owned by each player where the index corresponds to their ID.
export const PlayersScores = (cells, cellsPoints, numPlayers) => {
  const playersScores = Array(numPlayers).fill(0);

  for (let i = 0; i< cells.length; i++) {
    let playerID = cells[i];
    let playerScore = cellsPoints[i];

    playersScores[playerID] += playerScore;
  }

  return playersScores;
}

// Winner returns the player ID with the highest score among all players.
export const Winner = (playersScores) => {
  const maxScore = Math.max(playersScores);

  return playersScores.indexOf(maxScore)
}

// IsFinished determines if the game is over by checking all the cell contains non-null value.
export const IsFinished = (cells) => {
  return cells.filter(cell => cell !== null).length === 0;
}

// IsDraw determines if the finished game is draw by checking if more than one player scores the highest.
export const IsDraw = (playersScores) => {
  const maxScore = Math.max(playersScores);

  return playersScores.filter(score => score === maxScore).length > 0;
}