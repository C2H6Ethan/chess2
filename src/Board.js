import React, { useState, useEffect } from 'react';
import BoardSquare from './BoardSquare';

const colorPalettes = [
  ['#A9A9A9', '#707070'],
];

const hueStep = 360 / 64;
const rainbowPalette = [];

const Board = ({ onSquareClick, pieces, legalMoves, isRGBMode }) => {
  const [hue, setHue] = useState(0);
  const [tempRainbowPalette, setRainbowPalette] = useState([]);

  useEffect(() => {
    if (isRGBMode) {
      const intervalId = setInterval(() => {
        setHue(hue => hue + hueStep);
      }, 100);
      return () => clearInterval(intervalId);
    }
  }, [isRGBMode]);

  useEffect(() => {
    if (isRGBMode) {
      let tempRainbowPalette = [];
      for (let i = 0; i < 64; i++) {
        tempRainbowPalette.push(`hsl(${(hue + i * hueStep) % 360}, 100%, 50%)`);
      }
      setRainbowPalette(tempRainbowPalette);
    }
  }, [hue, isRGBMode]);

  const colorPalette = isRGBMode ? tempRainbowPalette : colorPalettes[0];

  const rows = [];
  for (let i = 7; i >= 0; i--) {
    const columns = [];
    for (let j = 0; j < 8; j++) {
      const squareKey = `${i},${j}`;
      let color = isRGBMode ? `hsl(${(hue + i * hueStep + j * hueStep) % 360}, 100%, 50%)` : colorPalette[(i + j) % 2];
      var legalMove = false;
      if (legalMoves.includes(squareKey)) {
        legalMove = true;
      }
      const squarePiece = pieces.find(piece => piece.position === squareKey);

      columns.push(
        <BoardSquare
          color={color}
          squareKey={squareKey}
          piece={squarePiece}
          onClick={() => onSquareClick(squareKey, squarePiece)}
          legalMove={legalMove}
        />
      );
    }
    rows.push(
      <div
        key={i}
        style={{
          width: '400px',
          height: '50px',
          display: 'flex',
        }}
      >
        {columns}
      </div>
    );
  }
  return (
    <div>
      {rows}
    </div>
  );
};


export default Board;
