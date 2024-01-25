import type { Game } from "boardgame.io";
import { INVALID_MOVE } from 'boardgame.io/core';

import { IsColonised, IsDraw, IsFinished, RandomIntArray, Winner } from './shared/Helpers';

// PenguinFive defines the game state.
export const PenguinFive: Game = {
    setup: ({ ctx }) => ({
        cells: Array(9).fill(null),
        fishes: RandomIntArray(1, 3, 9),
        scores: Array(ctx.numPlayers).fill(0),
    }),

    turn: {
        minMoves: 1,
        maxMoves: 1, // tell the framework to automatically end a player’s turn after a single move has been made
    },

    phases: {
        colonise: {
            moves: {
                clickCell: ({ G, playerID }, id) => {
                    // Player cannot move to a cell that has been selected.
                    if (G.cells[id] !== null) {
                        return INVALID_MOVE;
                    }
                    G.cells[id] = parseInt(playerID);
                },
            },
            turn: {
                minMoves: 2, // TODO: confugure the moves dynamically
                maxMoves: 2, // TODO: confugure the moves dynamically
            },
            start: true,
            endIf: ({ G, ctx }) => {
                return IsColonised(G.cells, ctx.numPlayers, 4); // TODO: confugure the availability dynamically
            },
            next: "hunting",
        },
        hunting: {
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
