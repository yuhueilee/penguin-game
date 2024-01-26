import { IsLinked } from "./Helpers";

it("correctly determine if the cell ID is linked to the location", () => {
    expect(IsLinked(0, 0, 0, 1)).toBe(true);
    expect(IsLinked(0, 0, 0, 2)).toBe(true);
    expect(IsLinked(0, 0, 1, 0)).toBe(true);
    expect(IsLinked(0, 0, 1, 1)).toBe(false);

    expect(IsLinked(0, 1, 0, 0)).toBe(true);
    expect(IsLinked(0, 1, 0, 2)).toBe(true);
    expect(IsLinked(0, 1, 1, 0)).toBe(true);
    expect(IsLinked(0, 1, 1, 1)).toBe(true);
    expect(IsLinked(0, 1, 2, 0)).toBe(true);
    expect(IsLinked(0, 1, 2, 1)).toBe(false);
    expect(IsLinked(0, 1, 2, 2)).toBe(true);
    expect(IsLinked(0, 1, 4, 1)).toBe(false);

    expect(IsLinked(1, 0, 2, 1)).toBe(true);
});
