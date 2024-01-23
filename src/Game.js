import { RandomIntArray } from "./shared/Helpers";
import { INVALID_MOVE } from 'boardgame.io/core';

// PenguinFive defines the game state.
export const PenguinFive = {
  setup: () => ({
    cells: Array(9).fill(null),
    cellsPoints: RandomIntArray(1, 3, 9)
  }),

  turn: {
    minMoves: 1,
    maxMoves: 1, // tell the framework to automatically end a player’s turn after a single move has been made
  },

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