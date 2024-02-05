import "./styles/Board.scss";

import { ActivePlayers, Ctx } from "boardgame.io";
import React from "react";

import { maxCellsPerRow, totalCells } from "./shared/Consts";
import { Columns, LinkedCells, Rows } from "./shared/Helpers";
import { Coord, GameData } from "./shared/Types";

export function PenguinBattleBoard({
    ctx,
    G,
    moves,
}: {
    ctx: Ctx;
    G: GameData;
    moves: any;
}): JSX.Element {
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
                        <h5 className="textStyle">fish: {G.fishes[cellID]}</h5>
                        <h5 className="textStyle">
                            playerID: {G.cells[cellID]}
                        </h5>
                        {showColoniseButton(ctx, G, currPlayerID, cellID) ? (
                            <button
                                className="coloniseBtn"
                                onClick={() => colonise(cellID)}
                            >
                                colonise
                            </button>
                        ) : (
                            <></>
                        )}
                        {showLocateButton(ctx, G, currPlayerID, cellID) ? (
                            <button
                                className="locateBtn"
                                onClick={() => locate(cellID)}
                            >
                                locate
                            </button>
                        ) : (
                            <></>
                        )}
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

    let ranking = [];
    for (let i = 0; i < ctx.numPlayers; i++) {
        ranking.push(
            <div className="playerInfo">
                <div className="ranking">ranking placeholder</div>
                <div className="playerIcon">player {i}</div>
                <div className="score">
                    <h2 className="highlightText">
                        {G.scores[i]}
                        <span className="smallText">fish</span>
                    </h2>
                </div>
            </div>
        );
    }

    return (
        <div className="board">
            <div className="summary">
                <h1 className="title">LeaderBoard</h1>
                {ranking}
                <hr className="divider"></hr>
                <h1 className="title">Who's Turn?</h1>
                <h2 className="highlightText">
                    <span className="smallText">player</span>
                    {currPlayerID}
                </h2>
            </div>
            <div className="table">{tbody}</div>
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
 * Determines if the colonise button should be shown or not.
 *
 * @param ctx context data of the game
 * @param g game data
 * @param playerID player ID
 * @param cellID cell ID
 * @returns a boolean indicating if the colonise button should be shown or not
 */
const showColoniseButton = (
    ctx: Ctx,
    g: GameData,
    playerID: number,
    cellID: number
) => {
    // Hide the button when the cell has been colonised.
    if (isCellColonised(cellID, g.cells)) {
        return false;
    }

    // Hide the button when the player is at locate stage.
    if (isPlayerAtStage(playerID, "locate", ctx.activePlayers)) {
        return false;
    }

    // Show the button when the player is at occupy stage and the cell is linked to the located cell, vice versa.
    if (isPlayerAtStage(playerID, "occupy", ctx.activePlayers)) {
        return isCellLinkedToLocatedLabour(
            cellID,
            g.location,
            g.cells,
            g.cellCoords,
            g.maxCellsPerRow
        );
    }

    return true;
};

/**
 * Locate button should only be shown when the all of the conditions below fulfills:
 * 1) player is at locate stage
 * 2) player's labour is located at the cell
 * 3) the cell is linked to other unoccupied cells
 *
 * @param ctx context data of the game
 * @param g game data
 * @param playerID player ID
 * @param cellID cell ID
 * @returns a boolean indicating if the locate button should be shown or not
 */
const showLocateButton = (
    ctx: Ctx,
    g: GameData,
    playerID: number,
    cellID: number
) => {
    return (
        isPlayerAtStage(playerID, "locate", ctx.activePlayers) &&
        isLabourLocated(playerID, cellID, g.locations) &&
        isLinked(cellID, g.cells, g.cellCoords, maxCellsPerRow)
    );
};

/**
 * Determines whether the cell ID matches with one of the player's labours' location.
 *
 * @param playerID player ID
 * @param cellID cell ID
 * @param locations location of the player's labours
 * @returns a boolean indicating if the cell ID matches with one of the labours' location
 */
const isLabourLocated = (
    playerID: number,
    cellID: number,
    locations: Array<Array<number>>
) => {
    return locations[playerID].indexOf(cellID) !== -1;
};

/**
 * Determines if the cell is linked to any other unoccupied cells.
 *
 * @param cellID targeted cell ID
 * @param cells a list of player IDs
 * @param cellCoords a list of coordinates
 * @param maxCellsPerRow maximum number of cells per row
 * @returns a boolean indicating if there are any cells linked to the targeted cell ID
 */
const isLinked = (
    cellID: number,
    cells: Array<number>,
    cellCoords: Array<Coord>,
    maxCellsPerRow: number
) => {
    return LinkedCells(cellID, cells, cellCoords, maxCellsPerRow).length !== 0;
};

/**
 * Determines if the cell is linked to the located cell.
 *
 * @param cellID current cell ID
 * @param locatedLabour located cell ID
 * @param cells a list of player IDs
 * @param cellCoords a list of coordinates
 * @param maxCellsPerRow maximum number of cells per row
 * @returns a boolean indicating if the current cell is linked to the located cell.
 */
const isCellLinkedToLocatedLabour = (
    cellID: number,
    locatedLabour: number,
    cells: Array<number>,
    cellCoords: Array<Coord>,
    maxCellsPerRow: number
) => {
    if (locatedLabour === -1) {
        return false;
    }

    const linkedCells = LinkedCells(
        locatedLabour,
        cells,
        cellCoords,
        maxCellsPerRow
    );

    return linkedCells.indexOf(cellID) !== -1;
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
const isPlayerAtStage = (
    playerID: number,
    stage: string,
    activePlayers: null | ActivePlayers
) => {
    if (activePlayers === null) {
        return false;
    }

    return activePlayers[playerID] === stage;
};
