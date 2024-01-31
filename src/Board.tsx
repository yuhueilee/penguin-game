import './styles/Board.scss';

import { ActivePlayers, Ctx } from 'boardgame.io';
import React from 'react';

import { maxCellsPerRow, totalCells } from './shared/Consts';
import { Columns, LinkedCells, Rows } from './shared/Helpers';
import { Coord, GameData } from './shared/Types';

export function PenguinBattleBoard({ ctx, G, moves } : {ctx: Ctx, G:GameData, moves:any }): JSX.Element {
    const currPlayerID = parseInt(ctx.currentPlayer);

    const colonise = (id: number) => moves.clickCell(id);
    const locate = (id: number) => moves.locateCell(id);

    let winner: any = "";
    if (ctx.gameover) {
        winner =
            ctx.gameover.winner !== undefined ? (
                <div id="winner">Winner: {ctx.gameover.winner}</div>
            ) : (
                <div id="winner">Draw!</div>
            );
    }

    let linkedCells: Array<number> = [];
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
                                isPlayerAtStage(
                                    currPlayerID,
                                    "locate",
                                    ctx.activePlayers
                                ) ||
                                (isPlayerAtStage(
                                    currPlayerID,
                                    "occupy",
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
                                    isPlayerAtStage(
                                        currPlayerID,
                                        "locate",
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

const cellStyle = (playerID: number) => {
    if (playerID === null) {
        return "emptyCell";
    }

    return "colonisedCell";
};

/**
 * Determines whether the cell ID matches with one of the player's labours' location.
 *
 * @param playerID player ID
 * @param cellID cell ID
 * @param locations location of the player's labours
 * @returns a boolean indicating if the cell ID matches with one of the labours' location
 */
const isLabourLocated = (playerID: number, cellID: number, locations: Array<Array<number>>) => {
    return locations[playerID].indexOf(cellID) !== -1;
};

/**
 * Determines if the labour is linked to any cells.
 *
 * @param cellID targeted cell ID
 * @param cells a list of player IDs
 * @param cellCoords a list of coordinates
 * @param maxCellsPerRow maximum number of cells per row
 * @returns a boolean indicating if there are any cells linked to the targeted cell ID
 */
const isLabourLinkedToOtherCells = (
    cellID: number,
    cells: Array<number>,
    cellCoords: Array<Coord>,
    maxCellsPerRow: number
) => {
    return LinkedCells(cellID, cells, cellCoords, maxCellsPerRow).length !== 0;
};

/**
 * Determines if the cell with the specific ID has been colonised by a player.
 *
 * @param id cell ID
 * @param cells a list of player IDs where the index corresponds to the cell ID
 * @returns a boolean indicating if the cell has been colonised by any player
 */
const isCellColonised = (id: number, cells: Array<number>) => {
    return cells[id] !== null;
};

/**
 * Determines if the player is at certain stage.
 * 
 * @param playerID player ID
 * @param stage stage name
 * @param activePlayers an object where the key is the player ID and the value is the stage the player is currently at
 * @returns 
 */
const isPlayerAtStage = (playerID: number, stage: string, activePlayers: (null | ActivePlayers)) => {
    if (activePlayers === null) {return false}

    return activePlayers[playerID] === stage
}
