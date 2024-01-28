import React from "react";
import "./styles/Board.scss";

import { numIceBurgs, maxIceBurgsPerRow } from "./shared/Consts";

export function PenguinFiveBoard({ ctx, G, moves }) {
    const colonise = (id) => moves.clickCell(id);
    const locate = (id) => moves.locateCell(id);

    let winner = "";
    if (ctx.gameover) {
        winner =
            ctx.gameover.winner !== undefined ? (
                <div id="winner">Winner: {ctx.gameover.winner}</div>
            ) : (
                <div id="winner">Draw!</div>
            );
    }

    const numRows = Math.ceil(numIceBurgs / maxIceBurgsPerRow);
    let tbody = [];
    for (let i = 0; i < numRows; i++) {
        let cells = [];
        const numColumns =
            Math.abs(i) % 2 === 0 ? maxIceBurgsPerRow : maxIceBurgsPerRow - 1;
        for (let j = 0; j < numColumns; j++) {
            const id = maxIceBurgsPerRow * i + j - Math.floor(i / 2);
            cells.push(
                <div key={id}>
                    <div className={cellStyle(G.cells[id])}>
                        <h5 className="textStyle">fishes: {G.fishes[id]}</h5>
                        <h5 className="textStyle">playerID: {G.cells[id]}</h5>
                        <button
                            className="coloniseBtn"
                            onClick={() => colonise(id)}
                            disabled={
                                isCellColonised(id, G.cells) ||
                                isLocatCellMove(ctx.phase, ctx.activePlayers)
                            }
                        >
                            colonise
                        </button>
                        <button
                            className="locateBtn"
                            onClick={() => locate(id)}
                            disabled={
                                !isLabourLocated(
                                    parseInt(ctx.currentPlayer),
                                    id,
                                    G.locations
                                ) ||
                                ctx.phase !== "hunting" ||
                                isAtOccupyStage(
                                    parseInt(ctx.currentPlayer),
                                    ctx.activePlayers
                                )
                            }
                        >
                            locate
                        </button>
                    </div>
                </div>
            );
        }
        tbody.push(
            <div key={i} className="row">
                {cells}
            </div>
        );
    }

    return (
        <div>
            <div id="board" className="table">
                {tbody}
            </div>
            {winner}
        </div>
    );
}

const cellStyle = (playerID) => {
    if (playerID === null) {
        return "emptyCell";
    }

    return "colonisedCell";
};

/**
 * Determines whether the cell ID matches with one of the player's labours' location.
 *
 * @param {number} playerID player ID
 * @param {number} cellID cell ID
 * @param {Array<number>} locations location of the player's labours
 * @returns a boolean indicating if the cell ID matches with one of the labours' location
 */
const isLabourLocated = (playerID, cellID, locations) => {
    return locations[playerID].indexOf(cellID) !== -1;
};

/**
 * Determines if the cell with the specific ID has been colonised by a player.
 *
 * @param {number} id cell ID
 * @param {Array<number>} cells a list of player IDs where the index corresponds to the cell ID
 * @returns a boolean indicating if the cell has been colonised by any player
 */
const isCellColonised = (id, cells) => {
    return cells[id] !== null;
};

/**
 * Determines if the current player can perform locate cell move.
 *
 * @param {string} phase game phase
 * @param {Object} activePlayers key refers to the player ID and value refers to the stage the player is in
 * @returns a boolean indicating if the current player can perform locate cell move
 */
const isLocatCellMove = (phase, activePlayers) => {
    return phase === "hunting" && activePlayers === null;
};

/**
 * Determines if the current player is at occupy stage.
 *
 * @param {number} playerID player ID
 * @param {Object} activePlayers
 * @returns a boolean indicating if the current player is at occupy stage
 */
const isAtOccupyStage = (playerID, activePlayers) => {
    return activePlayers !== null
        ? activePlayers[playerID] === "occupy"
        : false;
};
