import "./styles/Board.scss";

import { ActivePlayers, Ctx } from "boardgame.io";
import React from "react";

import { colorByPlayerID, maxCellsPerRow, totalCells } from "./shared/Consts";
import {
    Celebration,
    FishBoxIcon,
    FishIcon,
    PenguinIcon,
    PenguinLabourIcon,
} from "./shared/Elements";
import { Columns, LinkedCells, Ranking, Rows } from "./shared/Helpers";
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
                <div className="winner">
                    {Celebration()}
                    {PenguinIcon(parseInt(ctx.gameover.winner), 5, true)}
                    <h1 className="title">You Win!</h1>
                </div>
            ) : (
                <div className="winner">
                    <h1 className="title">Draw!</h1>
                </div>
            );
    }

    const numRows = Rows(totalCells, maxCellsPerRow);
    let tbody = [];
    for (let i = 0; i < numRows; i++) {
        let cells = [];
        const numColumns = Columns(i, maxCellsPerRow);
        for (let j = 0; j < numColumns; j++) {
            const cellID = maxCellsPerRow * i + j - Math.floor(i / 2);
            const playerID = playerIDOfLabourAtCell(cellID, G.locations);
            const handleOnClick = (id: number) => {
                if (showColoniseButton(ctx, G, currPlayerID, cellID)) {
                    return colonise(id);
                }
                if (showLocateButton(ctx, G, currPlayerID, cellID)) {
                    return locate(id);
                }
            };
            const disabled =
                !(
                    showColoniseButton(ctx, G, currPlayerID, cellID) ||
                    showLocateButton(ctx, G, currPlayerID, cellID)
                ) || ctx.gameover;
            const cellStyle = isFishCaught(cellID, G.cells, G.locations)
                ? "eatenCell"
                : "colonisedCell";
            cells.push(
                <button
                    key={cellID}
                    className={colorByPlayer(
                        cellStyle,
                        currPlayerID,
                        G.cells[cellID],
                        "emptyCell" + cellID
                    )}
                    onClick={() => handleOnClick(cellID)}
                    disabled={disabled}
                >
                    <div className="fishIconGrid">
                        {FishIcon(G.fish[cellID], 2)}
                    </div>
                    <div className="labourIconGrid">
                        {PenguinLabourIcon(playerID, 3, cellID === G.location)}
                    </div>
                </button>
            );
        }
        tbody.push(
            <div key={i} className="row">
                {cells}
            </div>
        );
    }

    const scoreRanking = Ranking(G.scores);
    let ranking = [];
    for (let i = 0; i < scoreRanking.length; i++) {
        let playerID = scoreRanking[i];
        const playerInfoStyle =
            playerID === currPlayerID ? "playerInfo focus" : "playerInfo";
        ranking.push(
            <div
                key={playerID}
                className={colorByPlayer(
                    playerInfoStyle,
                    currPlayerID,
                    playerID,
                    "playerInfo"
                )}
            >
                <div className="playerIcon">
                    {PenguinIcon(playerID, 3, playerID === currPlayerID)}
                </div>
                <div className="score">
                    {FishBoxIcon(G.scores[playerID], playerID, 1.5)}
                </div>
            </div>
        );
    }

    return (
        <div className="board">
            <div className="leaderboard">{ranking}</div>
            <div className="table">{tbody}</div>
            {winner}
        </div>
    );
}

/**
 * Determine the combined style based on player ID.
 *
 * @param prefix prefix style class name
 * @param currentPlayerID current active player ID
 * @param playerID player ID
 * @param fallBack fallback style when no player ID is supplied
 * @returns combined style based on player ID
 */
const colorByPlayer = (
    prefix: string,
    currentPlayerID: number,
    playerID: number,
    fallBack: string
) => {
    if (playerID === null) {
        return fallBack + " " + colorByPlayerID[currentPlayerID];
    }

    return prefix + " " + colorByPlayerID[playerID];
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
 * Determines if the cell has been colonised before.
 *
 * @param cellID cell ID
 * @param cells a list of player IDs
 * @param locations a list of list of each labour's location
 * @returns true if the cell ID has been colonised and no labour is located on it
 */
const isFishCaught = (
    cellID: number,
    cells: Array<number>,
    locations: Array<Array<number>>
): boolean => {
    if (isCellColonised(cellID, cells)) {
        const labourLocations = locations.flat(1);

        return labourLocations.indexOf(cellID) === -1;
    }

    return false;
};

/**
 * Returns the player ID associated to the labour located at the cell if there's any, otherwise return -1.
 *
 * @param cellID cell ID
 * @param locations a list of labours' locations
 * @returns player ID if the cell is occupied by a labour
 */
const playerIDOfLabourAtCell = (
    cellID: number,
    locations: Array<Array<number>>
): number => {
    for (let playerID = 0; playerID < locations.length; playerID++) {
        for (let i = 0; i < locations[playerID].length; i++) {
            let labourLocation = locations[playerID][i];
            if (cellID === labourLocation) {
                return playerID;
            }
        }
    }

    return -1;
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
