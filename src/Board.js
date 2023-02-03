import React from 'react';
import BoardSquare from './BoardSquare';

const Board = ({ onSquareClick, pieces, legalMoves }) => {
  const rows = [];
  for (let i = 7; i >= 0; i--) {
    const columns = [];
    for (let j = 0; j < 8; j++) {
      const squareKey = `${i},${j}`;
      let color = (i + j) % 2 === 0 ? 'black' : 'white';
      if (legalMoves.includes(squareKey)) {
        color = 'green';
      }
      const squarePiece = pieces.find(piece => piece.position === squareKey);

      columns.push(
        <BoardSquare
          color={color}
          squareKey={squareKey}
          piece={squarePiece}
          onClick={() => onSquareClick(squareKey, squarePiece)}
        />
      );
    }
    rows.push(<div key={i}>{columns}</div>);
  }
  return <div>{rows}</div>;
};

export default Board;
