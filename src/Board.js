import React from 'react';
import './styles/Board.css';

export function PenguinFiveBoard({ ctx, G, moves }) {
  const onClick = (id) => moves.clickCell(id);

  let winner = '';
  if (ctx.gameover) {
    winner =
      ctx.gameover.winner !== undefined ? (
        <div id="winner">Winner: {ctx.gameover.winner}</div>
      ) : (
        <div id="winner">Draw!</div>
      );
  }

  let tbody = [];
  for (let i = 0; i < 3; i++) {
    let cells = [];
    for (let j = 0; j < 3; j++) {
      const id = 3 * i + j;
      cells.push(
        <td key={id}>
          {G.cells[id] !== null ? (
            <div className="cellStyle">
              <h5 className="textStyle">fishes: {G.fishes[id]}</h5>
              <h5 className="textStyle">playerID: {G.cells[id]}</h5>
            </div>
          ) : (
            <div className="cellStyle">
              <h5 className="textStyle">fishes: {G.fishes[id]}</h5>
              <button className="buttonStyle" onClick={() => onClick(id)}>select</button>
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
        <tbody>{tbody}</tbody>
      </table>
      {winner}
    </div>
  );
}