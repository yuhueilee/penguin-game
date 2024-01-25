import React from "react";
import "./styles/Board.scss";

import { numIceBurgs, maxIceBurgsPerRow } from "./shared/Consts";

export function PenguinFiveBoard({ ctx, G, moves }) {
    const onClick = (id) => moves.clickCell(id);

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
                <td key={id}>
                    {G.cells[id] !== null ? (
                        <div className="cellStyle">
                            <h5 className="textStyle">
                                fishes: {G.fishes[id]}
                            </h5>
                            <h5 className="textStyle">
                                playerID: {G.cells[id]}
                            </h5>
                        </div>
                    ) : (
                        <div className="cellStyle">
                            <h5 className="textStyle">
                                fishes: {G.fishes[id]}
                            </h5>
                            <button
                                className="buttonStyle"
                                onClick={() => onClick(id)}
                            >
                                select
                            </button>
                        </div>
                    )}
                </td>
            );
        }
        tbody.push(<tr key={i}>{cells}</tr>);
    }

    return (
        <div>
            <table id="board">
                <tbody className="container">{tbody}</tbody>
            </table>
            {winner}
        </div>
    );
}
