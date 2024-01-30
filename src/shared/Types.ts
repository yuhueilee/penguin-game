export interface GameData {
    cells: Array<number>;
    cellCoords: Array<Coord>;
    fishes: Array<number>;
    scores: Array<number>;
    location: number;
    locations: Array<Array<number>>;
}

export interface Coord {
    xCoord: number;
    yCoord: number;
}
