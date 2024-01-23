import { RandomIntArray } from "./shared/Helpers"

export const PenguinFive = {
  setup: () => ({
    cells: Array(9).fill(null),
    cellsPoints: RandomIntArray(1, 3, 9)
  }),

  moves: {
    clickCell: ({ G, playerID }, id) => {
      G.cells[id] = playerID
    }
  },
}