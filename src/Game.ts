import type { Game } from "boardgame.io";
import { INVALID_MOVE } from "boardgame.io/core";

import { numIceBurgs } from "./shared/Consts";
import {
    IsColonised,
    IsDraw,
    IsFinished,
    RandomIntArray,
    Winner,
} from "./shared/Helpers";

// PenguinFive defines the game state.
export const PenguinFive: Game = {
    setup: ({ ctx }) => ({
        cells: Array(numIceBurgs).fill(null),
        fishes: RandomIntArray(1, 3, numIceBurgs),
        scores: Array(ctx.numPlayers).fill(0),
        location: null,
        locations: Array(ctx.numPlayers).fill(Array(2).fill(null)), // TODO: configure the availability per player dynamically
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
                return IsColonised(G.cells, ctx.numPlayers, 4); // TODO: confugure the availability for total players dynamically
            },
            next: "hunting",
        },
        hunting: {
            moves: {
                locateCell: ({ G, playerID, events }, id) => {
                    // Player cannot locate at a cell where they have not colonised.
                    if (
                        G.cells[id] !== parseInt(playerID) ||
                        G.location !== null
                    ) {
                        return INVALID_MOVE;
                    }
                    G.location = id; // record the located cell by the current player
                    events.setActivePlayers({
                        currentPlayer: "occupy",
                        minMoves: 1,
                        maxMoves: 1,
                    });
                },
            },
            turn: {
                minMoves: 2,
                maxMoves: 2,
                stages: {
                    occupy: {
                        moves: {
                            clickCell: ({ G, playerID, events }, id) => {
                                // Player cannot move to a cell that has been selected.
                                if (
                                    G.cells[id] !== null ||
                                    G.location === null
                                ) {
                                    return INVALID_MOVE;
                                }
                                G.cells[id] = parseInt(playerID);
                                G.scores[playerID] += G.fishes[G.location];
                                G.location = null; // reset the located cell after occupying
                                events.endTurn();
                            },
                        },
                    },
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
