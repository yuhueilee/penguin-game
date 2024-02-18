import {
    CalculateCoords,
    Columns,
    CoordToID,
    IDToCoord,
    IsFinished,
    IsLinked,
    LinkedCells,
    OutOfRange,
    Ranking,
    Rows,
} from "./Helpers";

describe("correctly determined if the game is over", () => {
    // Setup.
    const totalCells = 15;
    const maxCellsPerRow = 3;
    const coords = CalculateCoords(totalCells, maxCellsPerRow);

    test("should be false if the labours still can move", () => {
        expect(
            IsFinished(
                [
                    [2, 4],
                    [10, 11],
                ],
                Array(15).fill(null), // none of the cells has been occupied
                coords,
                maxCellsPerRow
            )
        ).toBe(false);
    });
    test("should be true if all of the cells has been occupied by a player", () => {
        expect(
            IsFinished(
                [
                    [2, 4],
                    [10, 11],
                ],
                Array(15).fill(0), // all of the cells has been occupied by player 0
                coords,
                maxCellsPerRow
            )
        ).toBe(true);
    });
    test("should be false if no labour has been put on the cell", () => {
        expect(
            IsFinished(
                [
                    [-1, -1],
                    [-1, -1],
                ], // no cells has been located
                Array(15).fill(null), // none of the cells has been occupied
                coords,
                maxCellsPerRow
            )
        ).toBe(false);
    });
});

describe("correctly calculated the number of rows", () => {
    test("should return integer row value", () => {
        expect(Rows(5, 2)).toEqual(3);
        expect(Rows(5, 2)).toEqual(3);
        expect(Rows(15, 3)).toEqual(6);
        expect(Rows(8, 3)).toEqual(3);
        expect(Rows(11, 4)).toEqual(3);
    });
});

describe("correctly calculated the number of columns", () => {
    test("should return maximum cells per row subtracted by one given odd index", () => {
        expect(Columns(1, 2)).toEqual(1);
        expect(Columns(1, 3)).toEqual(2);
    });
    test("should return maximum cells per row given even index", () => {
        expect(Columns(2, 3)).toEqual(3);
        expect(Columns(2, 4)).toEqual(4);
    });
});

describe("correctly calculated the coordinate based on the ID", () => {
    test("should return x and y coordinate given an ID and a list of coordinates", () => {
        expect(IDToCoord(0, CalculateCoords(15, 3))).toEqual({
            xCoord: 0,
            yCoord: 0,
        });
        expect(IDToCoord(4, CalculateCoords(15, 3))).toEqual({
            xCoord: 1,
            yCoord: 3,
        });
        expect(IDToCoord(6, CalculateCoords(15, 3))).toEqual({
            xCoord: 2,
            yCoord: 2,
        });
        expect(IDToCoord(8, CalculateCoords(11, 4))).toEqual({
            xCoord: 2,
            yCoord: 2,
        });
        expect(IDToCoord(8, CalculateCoords(9, 5))).toEqual({
            xCoord: 1,
            yCoord: 7,
        });
    });
});

describe("correctly calculated the ID based on the coordinate", () => {
    test("should return an ID given the coordinate and a list of coordinates", () => {
        expect(
            CoordToID(
                {
                    xCoord: 0,
                    yCoord: 0,
                },
                CalculateCoords(15, 3)
            )
        ).toEqual(0);
        expect(
            CoordToID(
                {
                    xCoord: 1,
                    yCoord: 3,
                },
                CalculateCoords(15, 3)
            )
        ).toEqual(4);
        expect(
            CoordToID(
                {
                    xCoord: 2,
                    yCoord: 2,
                },
                CalculateCoords(15, 3)
            )
        ).toEqual(6);
        expect(
            CoordToID(
                {
                    xCoord: 2,
                    yCoord: 2,
                },
                CalculateCoords(11, 4)
            )
        ).toEqual(8);
        expect(
            CoordToID(
                {
                    xCoord: 1,
                    yCoord: 7,
                },
                CalculateCoords(9, 5)
            )
        ).toEqual(8);
    });
});

it("correctly determine if the cell ID is linked to the location", () => {
    expect(IsLinked(1, 3, CalculateCoords(5, 2))).toBe(true);

    let cellCoords = CalculateCoords(15, 3);
    expect(IsLinked(0, 1, cellCoords)).toBe(true);
    expect(IsLinked(0, 2, cellCoords)).toBe(true);
    expect(IsLinked(0, 3, cellCoords)).toBe(true);
    expect(IsLinked(0, 4, cellCoords)).toBe(false);

    expect(IsLinked(1, 0, cellCoords)).toBe(true);
    expect(IsLinked(1, 2, cellCoords)).toBe(true);
    expect(IsLinked(1, 3, cellCoords)).toBe(true);
    expect(IsLinked(1, 4, cellCoords)).toBe(true);
    expect(IsLinked(1, 5, cellCoords)).toBe(true);
    expect(IsLinked(1, 6, cellCoords)).toBe(false);
    expect(IsLinked(1, 7, cellCoords)).toBe(true);
    expect(IsLinked(1, 11, cellCoords)).toBe(false);
    expect(IsLinked(3, 6, cellCoords)).toBe(true);

    expect(IsLinked(4, 8, CalculateCoords(11, 4))).toBe(true);

    expect(IsLinked(5, 10, CalculateCoords(14, 5))).toBe(true);
});

it("correctly determines if the coordinate is out of range", () => {
    expect(OutOfRange(0, 0, 15, 3)).toBe(false);
    expect(OutOfRange(2, 2, 15, 3)).toBe(false);
    expect(OutOfRange(5, 3, 15, 3)).toBe(false);
});

it("correctly return a list of linked cell IDs", () => {
    const cellCoords = CalculateCoords(15, 3);
    let cells = Array(15).fill(null);
    expect(LinkedCells(0, cells, cellCoords, 3)).toEqual([1, 2, 3, 6, 9, 12]);
    expect(LinkedCells(8, cells, cellCoords, 3)).toEqual([
        2, 4, 5, 6, 9, 10, 11, 14,
    ]);
    cells[6] = 1;
    expect(LinkedCells(0, cells, cellCoords, 3)).toEqual([1, 2, 3]);
    expect(LinkedCells(8, cells, cellCoords, 3)).toEqual([5, 9, 10, 11, 14]);
});

it("correctly return the ranking of player's ID", () => {
    expect(Ranking([3, 4, 1])).toEqual([1, 0, 2]);
    expect(Ranking([2, 4, 5, 1])).toEqual([2, 1, 0, 3]);
    expect(Ranking([3, 1, 1])).toEqual([0, 1, 2]);
});
