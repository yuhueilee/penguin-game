import { CalculateCoords, IDToCoord, IsLinked, LinkedCells } from "./Helpers";

it("correctly calculated the coordinate based on the ID", () => {
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

it("correctly return a list of linked cell IDs", () => {
    expect(
        LinkedCells(3, Array(15).fill(null), CalculateCoords(15, 3))
    ).toEqual([]);
});
