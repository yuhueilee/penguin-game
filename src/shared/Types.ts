export interface GameData {
    cells: Array<number>;
    fishes: Array<number>;
    scores: Array<number>;
    location: LabourLocation;
    locations: Array<Array<LabourLocation>>;
}

export type LabourLocation = number | null;
