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
            const id =
                maxIceBurgsPerRow * i +
                j -
                Math.floor(i / (maxIceBurgsPerRow - 1));
            cells.push(
                <div key={id}>
                    <div className={cellStyle(G.cells[id])}>
                        <h5 className="textStyle">fishes: {G.fishes[id]}</h5>
                        <h5 className="textStyle">playerID: {G.cells[id]}</h5>
                        <button
                            className="coloniseBtn"
                            onClick={() => colonise(id)}
                            disabled={
                                G.cells[id] !== null ||
                                (ctx.phase === "hunting" && G.location === null)
                            }
                        >
                            colonise
                        </button>
                        <button
                            className="locateBtn"
                            onClick={() => locate(id)}
                            disabled={
                                ctx.phase !== "hunting" ||
                                G.cells[id] === null ||
                                G.cells[id] !== parseInt(ctx.currentPlayer) ||
                                G.location !== null
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
