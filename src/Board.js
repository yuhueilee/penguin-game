import React from "react";
import "./styles/Board.scss";

import { totalCells, maxCellsPerRow } from "./shared/Consts";
import { Columns, LinkedCells, Rows } from "./shared/Helpers";

export function PenguinFiveBoard({ ctx, G, moves }) {
    const currPlayerID = parseInt(ctx.currentPlayer);

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

    let linkedCells = [];
    if (G.location !== -1) {
        linkedCells = LinkedCells(
            G.location,
            G.cells,
            G.cellCoords,
            maxCellsPerRow
        );
    }

    const numRows = Rows(totalCells, maxCellsPerRow);
    let tbody = [];
    for (let i = 0; i < numRows; i++) {
        let cells = [];
        const numColumns = Columns(i, maxCellsPerRow);
        for (let j = 0; j < numColumns; j++) {
            const cellID = maxCellsPerRow * i + j - Math.floor(i / 2);
            cells.push(
                <div key={cellID}>
                    <div className={cellStyle(G.cells[cellID])}>
                        <h5 className="textStyle">
                            fishes: {G.fishes[cellID]}
                        </h5>
                        <h5 className="textStyle">
                            playerID: {G.cells[cellID]}
                        </h5>
                        <button
                            className="coloniseBtn"
                            onClick={() => colonise(cellID)}
                            disabled={
                                isCellColonised(cellID, G.cells) ||
                                isAtLocateStage(
                                    currPlayerID,
                                    ctx.activePlayers
                                ) ||
                                (isAtOccupyStage(
                                    currPlayerID,
                                    ctx.activePlayers
                                ) &&
                                    linkedCells.indexOf(cellID) === -1)
                            }
                        >
                            colonise
                        </button>
                        <button
                            className="locateBtn"
                            onClick={() => locate(cellID)}
                            disabled={
                                !(
                                    isAtLocateStage(
                                        currPlayerID,
                                        ctx.activePlayers
                                    ) &&
                                    isLabourLocated(
                                        currPlayerID,
                                        cellID,
                                        G.locations
                                    ) &&
                                    isLabourLinkedToOtherCells(
                                        cellID,
                                        G.cells,
                                        G.cellCoords,
                                        maxCellsPerRow
                                    )
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
 * Determines if the labour is linked to any cells.
 *
 * @param {number} cellID targeted cell ID
 * @param {Array<number>} cells a list of player IDs
 * @param {Array<Coord>} cellCoords a list of coordinates
 * @param {number} maxCellsPerRow maximum number of cells per row
 * @returns a boolean indicating if there are any cells linked to the targeted cell ID
 */
const isLabourLinkedToOtherCells = (
    cellID,
    cells,
    cellCoords,
    maxCellsPerRow
) => {
    return LinkedCells(cellID, cells, cellCoords, maxCellsPerRow).length !== 0;
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
 * @param {number} playerID player ID
 * @param {Object} activePlayers key refers to the player ID and value refers to the stage the player is in
 * @returns a boolean indicating if the current player can perform locate cell move
 */
const isAtLocateStage = (playerID, activePlayers) => {
    return activePlayers !== null
        ? activePlayers[playerID] === "locate"
        : false;
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
