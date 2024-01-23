import { RandomInt } from "./shared/Helpers"

export const PenguinFive = {
  setup: () => ({
    cells: Array(9).fill({
      point: RandomInt(1, 3),
      playerID: null
    })
  }),

  moves: {
    clickCell: ({ G, playerID }, id) => {
      G.cells[id].playerID = playerID
    }
  },
}