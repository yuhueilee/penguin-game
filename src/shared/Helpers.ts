import { Coord } from "./Types";

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

/**
 * Returns the player ID with the highest score among all players.
 *
 * @param playersScores a list of scores where the index is the player ID
 * @returns player ID with the highest score
 */
export const Winner = (playersScores: Array<number>) => {
    const maxScore = Math.max(...playersScores);

    return playersScores.indexOf(maxScore);
};

/**
 * Determines if the game is over by checking all the cell contains non-null value.
 *
 * @param cells a list of player IDs where the index is the cell ID
 * @returns a boolean indicating if the game is over
 */
export const IsFinished = (cells: Array<any>) => {
    return cells.filter((cell) => cell === null).length === 0;
};

/**
 * Determines if the finished game is draw by checking if more than one player scores the highest.
 *
 * @param playersScores a list of scores where the index is the player ID
 * @returns a boolean indicating if the game is draw
 */
export const IsDraw = (playersScores: Array<number>) => {
    const maxScore = Math.max(...playersScores);

    return playersScores.filter((score) => score === maxScore).length > 1;
};

/**
 * Determines if each player has colonised N cells where N is the availability value.
 *
 * @param cells a list of player IDs where the index is the cell ID
 * @param numPlayers total number of players
 * @param availability total number of labours available per player
 * @returns a boolean indicating if each player has colonised N cells where N is the availability value
 */
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

/**
 * Returns the total number of rows.
 *
 * @param totalCells total number of cells
 * @param maxCellsPerRow maximum number of cells per row
 * @returns total number of rows
 */
export const Rows = (totalCells: number, maxCellsPerRow: number): number => {
    return totalCells % maxCellsPerRow === 0
        ? totalCells / maxCellsPerRow + 1
        : Math.ceil(totalCells / maxCellsPerRow);
};

/**
 * Returns the total number of columns.
 *
 * @param rowIndex index of the row
 * @param maxCellsPerRow maximum number of cells per row
 * @returns total number of columns
 */
export const Columns = (rowIndex: number, maxCellsPerRow: number): number => {
    return Math.abs(rowIndex) % 2 === 0 ? maxCellsPerRow : maxCellsPerRow - 1;
};

/**
 * Transforms from integer value to coordinate values.
 *
 * @param cellID cell ID
 * @param cellCoords a list of coordinate
 * @returns a list of length 2 where the first value refers to the x-coordinate and the second value refers to the scaled y-coordinate
 */
export const IDToCoord = (cellID: number, cellCoords: Array<Coord>): Coord => {
    return cellCoords[cellID];
};

/**
 * Returns a list of coordinate associated with the cell ID.
 *
 * @param totalCells total number of cells
 * @param maxCellsPerRow maximum number of cells per row
 * @returns a list of coordinate where the index is the cell ID
 */
export const CalculateCoords = (
    totalCells: number,
    maxCellsPerRow: number
): Array<Coord> => {
    let cellCoords: Array<Coord> = Array(totalCells)
        .fill(undefined)
        .map(() => ({
            xCoord: 0,
            yCoord: 0,
        }));

    const numRows = Rows(totalCells, maxCellsPerRow);
    for (let i = 0; i < numRows; i++) {
        const numColumns = Columns(i, maxCellsPerRow);
        for (let j = 0; j < numColumns; j++) {
            const id = maxCellsPerRow * i + j - Math.floor(i / 2);
            // Scale the j value by 2 if it's on the even row else scale by 2 and addition by 1 for odd row.
            // Note: This is to facilitate the calculation of whether the two cells are linked diagonally or horizontally.
            const jScaled = Math.abs(i) % 2 === 0 ? j * 2 : j * 2 + 1;
            cellCoords[id].xCoord = i;
            cellCoords[id].yCoord = jScaled;
        }
    }

    return cellCoords;
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
 * @param cellID cell ID
 * @param locID located cell ID
 * @param cellCoords a list of coordinate
 * @returns a boolean indicating if the cell ID is linked to the labour's location
 */
export const IsLinked = (
    cellID: number,
    locID: number,
    cellCoords: Array<Coord>
): boolean => {
    const cellCoord = IDToCoord(cellID, cellCoords);
    const locCoord = IDToCoord(locID, cellCoords);

    return (
        isLinkedHorizontally(cellCoord.xCoord, locCoord.xCoord) ||
        isLinkedDiagonally(
            cellCoord.xCoord,
            cellCoord.yCoord,
            locCoord.xCoord,
            locCoord.yCoord
        )
    );
};

/**
 * Determines if the given coordinate is within the range.
 *
 * @param xCoord x-coordinate
 * @param yCoord y-coordinate
 * @param totalCells total number of cells
 * @param maxCellsPerRow maximum cells per row
 * @returns a boolean indicating if the given coordinate is within the range
 */
export const OutOfRange = (
    xCoord: number,
    yCoord: number,
    totalCells: number,
    maxCellsPerRow: number
): boolean => {
    const minX = 0;
    const maxX =
        totalCells % maxCellsPerRow === 0
            ? totalCells / maxCellsPerRow + 1
            : Math.ceil(totalCells / maxCellsPerRow);
    const minY = 0;
    const maxY = maxCellsPerRow * 2 - 1;

    return xCoord < minX || xCoord >= maxX || yCoord < minY || yCoord >= maxY;
};

/**
 * Returns a list of cell IDs connected to the target cell ID either horizontally or diagonally without being occupied by any player.
 *
 * @param target targeted cell ID
 * @param cells a list of player IDs where the index is the cell ID
 * @param cellCoords a list of coordinates where the index is the cell ID
 * @returns a list of cell IDs connected to the target cell ID either horizontally or diagonally without being occupied by any player
 */
export const LinkedCells = (
    target: number,
    cells: Array<number>,
    cellCoords: Array<Coord>
): Array<number> => {
    let linkedCells: Array<number> = [];

    // iRange: -1, -1, +0, +1, +1, +0
    // jRange: -1, +1, +1, +1, -1, -1
    // multipliers = 1, 1, 1, 1, 1, 1;
    // outOfRange: false, false, false, false, false, false

    // dirIndex = 0; dirIndex < 6; dirIndex++
    //   while outOfRange[dirIndex] === false {
    //     currX = cellCoords[target].xCoord += iRange[dirIndex]*multipliers[dirIndex]
    //     currY = cellCoords[target].yCoord += jRange[dirIndex]*multipliers[dirIndex]
    //     if (OutOfRange(currX, currY, totalCells, maxCellsPerRow)) {
    //       outOfRange[dirIndex] = true
    //     }
    //     currID = CoordToID(currX, currY, totalCells, maxCellsPerRow)
    //     if (cells[currID] === null) {
    //       linkedCells.push(currID);
    //       multipliers[dirIndex]++;
    //     }
    //   }

    return linkedCells;
};
