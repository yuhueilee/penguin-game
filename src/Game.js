import { RandomIntArray, IsFinished, IsDraw, Winner } from "./shared/Helpers";
import { INVALID_MOVE } from "boardgame.io/core";

// PenguinFive defines the game state.
export const PenguinFive = {
    setup: ({ ctx }) => ({
        cells: Array(9).fill(null),
        fishes: RandomIntArray(1, 3, 9),
        scores: Array(ctx.numPlayers).fill(0),
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
            G.cells[id] = parseInt(playerID);
            G.scores[playerID] += G.fishes[id];
        },
    },

    endIf: ({ G }) => {
        if (IsFinished(G.cells)) {
            if (IsDraw(G.scores)) {
                return { draw: true };
            } else {
                return { winner: Winner(G.scores) };
            }
        }
    },
};
