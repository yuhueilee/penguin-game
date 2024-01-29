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
export const IsColonised = (
    cells: Array<any>,
    numPlayers: number,
    availability: number
) => {
    const playersColonies: Array<number> = Array(numPlayers).fill(0);

    cells
        .filter((playerID) => playerID !== null)
        .map((playerID) => {
            return (playersColonies[playerID] += 1);
        });

    const totalColonies: number = playersColonies.reduce(
        (accu, curr) => accu + curr,
        0
    );

    return totalColonies === availability;
};

export const IDToCoord = (
    target: number,
    totalIceBurgs: number,
    maxIceBurgsPerRow: number
): Array<number> => {
    let coord: Array<number> = [0, 0];

    const numRows = Math.ceil(totalIceBurgs / maxIceBurgsPerRow);
    for (let i = 0; i < numRows; i++) {
        const numColumns =
            Math.abs(i) % 2 === 0 ? maxIceBurgsPerRow : maxIceBurgsPerRow - 1;
        for (let j = 0; j < numColumns; j++) {
            const id = maxIceBurgsPerRow * i + j - Math.floor(i / 2);
            // Scale the j value by 2 if it's on the even row else scale by 2 and addition by 1 for odd row.
            // Note: This is to facilitate the calculation of whether the two cells are linked diagonally or horizontally.
            const jScaled = Math.abs(i) % 2 === 0 ? j * 2 : j * 2 + 1;
            if (id === target) {
                coord[0] = i;
                coord[1] = jScaled;
                break;
            }
        }
    }

    return coord;
};

/**
 * Determines if the current cell and the located cell is linked horizontally.
 *
 * @param cellX x-coordinate for the current cell
 * @param locX x-coordinate for the located cell
 * @returns a boolean indicating if the current cell and the located cell is linked horizontally
 */
const isLinkedHorizontally = (cellX: number, locX: number): boolean => {
    return cellX === locX;
};

/**
 * Determines if the current cell and the located cell is linked diagonally.
 *
 * @param cellX x-coordinate for the current cell
 * @param cellY y-coordinate for the current cell
 * @param locX x-coordinate for the located cell
 * @param locY y-coordinate for the located cell
 * @returns a boolean indicating if the current cell and the located cell is linked diagonally
 */
const isLinkedDiagonally = (
    cellX: number,
    cellY: number,
    locX: number,
    locY: number
): boolean => {
    const absDiffInX = Math.abs(cellX - locX);
    const absDiffInY = Math.abs(cellY - locY);

    return absDiffInX === absDiffInY;
};

/**
 * Determines if the cell is linked to the labour's location.
 *
 * @returns a boolean indicating if the cell ID is linked to the labour's location
 */
export const IsLinked = (
    cellID: number,
    locID: number,
    totalIceBurgs: number,
    maxIceBurgsPerRow: number
): boolean => {
    const [cellX, cellY] = IDToCoord(cellID, totalIceBurgs, maxIceBurgsPerRow);
    const [locX, locY] = IDToCoord(locID, totalIceBurgs, maxIceBurgsPerRow);

    return (
        isLinkedHorizontally(cellX, locX) ||
        isLinkedDiagonally(cellX, cellY, locX, locY)
    );
};
