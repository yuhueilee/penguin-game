export const RandomInt = (min: number, max: number) => {
    // Ensure that min and max are integers
    min = Math.ceil(min);
    max = Math.floor(max);

    // Generate a random number between min and max (inclusive)
    const randomNum = Math.floor(Math.random() * (max - min + 1)) + min;

    return randomNum;
};

export const RandomIntArray = (min: number, max: number, length: number) => {
    const randomIntArray: Array<number> = [];

    for (let i = 0; i < length; i++) {
        const randomNum = RandomInt(min, max);

        randomIntArray.push(randomNum);
    }

    return randomIntArray;
};

// Winner returns the player ID with the highest score among all players.
export const Winner = (playersScores: Array<number>) => {
    const maxScore = Math.max(...playersScores);

    return playersScores.indexOf(maxScore);
};

// IsFinished determines if the game is over by checking all the cell contains non-null value.
export const IsFinished = (cells: Array<any>) => {
    return cells.filter((cell) => cell === null).length === 0;
};

// IsDraw determines if the finished game is draw by checking if more than one player scores the highest.
export const IsDraw = (playersScores: Array<number>) => {
    const maxScore = Math.max(...playersScores);

    return playersScores.filter((score) => score === maxScore).length > 1;
};

// IsColonised determines if each player has colonised N cells where N is the availability value.
export const IsColonised = (cells: Array<any>, numPlayers: number, availability: number) => {
    const playersColonies: Array<number> = Array(numPlayers).fill(0);

    cells.filter(playerID => playerID !== null).map(playerID => {
        return playersColonies[playerID] += 1;
    })

    const totalColonies: number = playersColonies.reduce((accu, curr) => accu + curr, 0);

    return totalColonies === availability
}
