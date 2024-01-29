export interface GameData {
    cells: Array<number>;
    cellCoords: Array<Coord>;
    fishes: Array<number>;
    scores: Array<number>;
    location: LabourLocation;
    locations: Array<Array<LabourLocation>>;
}

export interface Coord {
    xCoord: number;
    yCoord: number;
}

export type LabourLocation = number | null;
