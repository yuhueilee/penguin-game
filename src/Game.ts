import type { Game } from "boardgame.io";
import { INVALID_MOVE } from "boardgame.io/core";

import { maxLaboursPerPlayer, totalCells } from "./shared/Consts";
import {
    IsColonised,
    IsDraw,
    IsFinished,
    RandomIntArray,
    Winner,
} from "./shared/Helpers";
import { GameData } from "./shared/Types";

// PenguinFive defines the game state.
export const PenguinFive: Game = {
    setup: ({ ctx }): GameData => ({
        cells: Array(totalCells).fill(null),
        cellCoords: Array(totalCells).fill({
            xCoord: 0,
            yCoord: 0,
        }),
        fishes: RandomIntArray(1, 3, totalCells),
        scores: Array(ctx.numPlayers).fill(0),
        location: null,
        locations: Array(ctx.numPlayers).fill(
            Array(maxLaboursPerPlayer).fill(null)
        ), // TODO: configure the availability per player dynamically
    }),

    turn: {
        minMoves: 1,
        maxMoves: 1, // tell the framework to automatically end a player’s turn after a single move has been made
    },

    phases: {
        colonise: {
            moves: {
                clickCell: ({ G, ctx, playerID }, id) => {
                    // Player cannot move to a cell that has been selected.
                    if (G.cells[id] !== null) {
                        return INVALID_MOVE;
                    }
                    const intPlayerID = parseInt(playerID);
                    const moveOrder =
                        ctx.numMoves === undefined ? 0 : ctx.numMoves;

                    // Update the selected cell's occupation status.
                    G.cells[id] = intPlayerID;

                    // Store the current location for each player's labour.
                    G.locations[intPlayerID][moveOrder] = id;
                },
            },
            turn: {
                minMoves: maxLaboursPerPlayer, // TODO: confugure the moves dynamically
                maxMoves: maxLaboursPerPlayer, // TODO: confugure the moves dynamically
            },
            start: true,
            endIf: ({ G, ctx }) => {
                return IsColonised(
                    G.cells,
                    ctx.numPlayers,
                    ctx.numPlayers * maxLaboursPerPlayer
                ); // TODO: confugure the availability for total players dynamically
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

                    // Record the current location selected by the player.
                    G.location = id;

                    // Make the current player to occupy cell after selecting their labour's location.
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
                                const intPlayerID = parseInt(playerID);

                                // Update the selected cell's occupation status.
                                G.cells[id] = intPlayerID;

                                // Update the scores for the player based on the location their labour comes from.
                                G.scores[playerID] += G.fishes[G.location];

                                // Update the location for each of the players' labours.
                                const index = G.locations[intPlayerID].indexOf(
                                    G.location
                                );
                                G.locations[intPlayerID][index] = id;

                                // Reset the current location before ending a turn.
                                G.location = null;

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
