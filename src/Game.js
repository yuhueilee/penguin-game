import { RandomIntArray } from "./shared/Helpers";
import { INVALID_MOVE } from 'boardgame.io/core';

export const PenguinFive = {
  setup: () => ({
    cells: Array(9).fill(null),
    cellsPoints: RandomIntArray(1, 3, 9)
  }),

  moves: {
    clickCell: ({ G, playerID }, id) => {
      // Player cannot move to a cell that has been selected.
      if (G.cells[id] !== null) {
        return INVALID_MOVE;
      }
      G.cells[id] = playerID
    }
  },
}