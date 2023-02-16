import React from 'react';

export default function PieceImage({ piece }) {
  const { type, color } = piece;
  const pieceColor = color === 'white' ? 'w' : 'b';
  const fileName = `${pieceColor}${type}.png`;

  return (
    <img src={`/src/images/${fileName}`} alt={`${color} ${type}`} />
  );
}
