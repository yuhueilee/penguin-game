import { IDToCoord, IsLinked } from "./Helpers";

it("correctly calculated the coordinate based on the ID", () => {
    expect(IDToCoord(6, 15, 3)).toEqual([2, 1]);
    expect(IDToCoord(8, 11, 4)).toEqual([2, 1]);
    expect(IDToCoord(8, 9, 5)).toEqual([1, 3]);
});

it("correctly determine if the cell ID is linked to the location", () => {
    expect(IsLinked(1, 3, 5, 2)).toBe(true);

    expect(IsLinked(0, 1, 15, 3)).toBe(true);
    expect(IsLinked(0, 2, 15, 3)).toBe(true);
    expect(IsLinked(0, 3, 15, 3)).toBe(true);
    expect(IsLinked(0, 4, 15, 3)).toBe(false);

    expect(IsLinked(1, 0, 15, 3)).toBe(true);
    expect(IsLinked(1, 2, 15, 3)).toBe(true);
    expect(IsLinked(1, 3, 15, 3)).toBe(true);
    expect(IsLinked(1, 4, 15, 3)).toBe(true);
    expect(IsLinked(1, 5, 15, 3)).toBe(true);
    expect(IsLinked(1, 6, 15, 3)).toBe(false);
    expect(IsLinked(1, 7, 15, 3)).toBe(true);
    expect(IsLinked(1, 11, 15, 3)).toBe(false);
    expect(IsLinked(3, 6, 15, 3)).toBe(true);

    expect(IsLinked(4, 8, 11, 4)).toBe(true);

    expect(IsLinked(5, 10, 14, 5)).toBe(true);
});
