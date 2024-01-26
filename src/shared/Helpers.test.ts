import { IDToCoord, IsLinked } from "./Helpers";

it("correctly calculated the coordinate based on the ID", () => {
    expect(IDToCoord(6, 15, 3)).toEqual([2, 1]);
    expect(IDToCoord(8, 10, 4)).toEqual([2, 1]);
    expect(IDToCoord(8, 8, 5)).toEqual([1, 3]);
});

it("correctly determine if the cell ID is linked to the location", () => {
    expect(IsLinked(0, 1, 2, 0, 2)).toBe(true);

    expect(IsLinked(0, 0, 0, 1, 3)).toBe(true);
    expect(IsLinked(0, 0, 0, 2, 3)).toBe(true);
    expect(IsLinked(0, 0, 1, 0, 3)).toBe(true);
    expect(IsLinked(0, 0, 1, 1, 3)).toBe(false);
    expect(IsLinked(0, 1, 0, 0, 3)).toBe(true);
    expect(IsLinked(0, 1, 0, 2, 3)).toBe(true);
    expect(IsLinked(0, 1, 1, 0, 3)).toBe(true);
    expect(IsLinked(0, 1, 1, 1, 3)).toBe(true);
    expect(IsLinked(0, 1, 2, 0, 3)).toBe(true);
    expect(IsLinked(0, 1, 2, 1, 3)).toBe(false);
    expect(IsLinked(0, 1, 2, 2, 3)).toBe(true);
    expect(IsLinked(0, 1, 4, 1, 3)).toBe(false);
    expect(IsLinked(1, 0, 2, 1, 3)).toBe(true);

    expect(IsLinked(1, 0, 2, 1, 4)).toBe(true);

    expect(IsLinked(1, 0, 2, 1, 5)).toBe(true);
});
