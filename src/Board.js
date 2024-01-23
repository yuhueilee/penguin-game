import React from 'react';

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

  const cellStyle = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    border: '1px solid #555',
    width: '100px',
    height: '100px',
    padding: '16px',
    lineHeight: '10px',
    textAlign: 'center',
  };

  const buttonStyle = {
    backgroundColor: 'black',
    color: 'white',
    fontFamily: 'sans-serif',
  };

  const textStyle = {
    margin: '8px',
    fontWeight: '500',
    fontFamily: 'sans-serif',
  }

  let tbody = [];
  for (let i = 0; i < 3; i++) {
    let cells = [];
    for (let j = 0; j < 3; j++) {
      const id = 3 * i + j;
      cells.push(
        <td key={id}>
          {G.cells[id] !== null ? (
            <div style={cellStyle}>
              <h5 style={textStyle}>fishes: {G.fishes[id]}</h5>
              <h5 style={textStyle}>playerID: {G.cells[id]}</h5>
            </div>
          ) : (
            <div style={cellStyle}>
              <h5 style={textStyle}>fishes: {G.fishes[id]}</h5>
              <button style={buttonStyle} onClick={() => onClick(id)}>select</button>
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