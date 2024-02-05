export interface GameData {
    cells: Array<number>;
    cellCoords: Array<Coord>;
    fish: Array<number>;
    scores: Array<number>;
    location: number;
    locations: Array<Array<number>>;
    maxCellsPerRow: number;
}

export interface Coord {
    xCoord: number;
    yCoord: number;
}
