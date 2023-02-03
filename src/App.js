// import React, { useState } from 'react';
// import Board from './Board';

// function App() {
//   const [selectedSquare, setSelectedSquare] = useState(null);
//   const [selectedPiece, setSelectedPiece] = useState(null);

//   const onSquareClick = (squareKey, piece) => {
//     if (!selectedPiece) {
//       setSelectedPiece(piece);
//       setSelectedSquare(squareKey);
//     } else {
//       // move piece to new square
//       const newPieces = pieces.map(p => {
//         if (p === selectedPiece) {
//           return { ...p, position: squareKey };
import React from 'react';
import Board from './Board';
import useBoardState from './useBoardState';

function App() {
  const {
  selectedSquare,
  selectedPiece,
  pieces,
  turn,
  onSquareClick
  } = useBoardState();

return (
  <div>
    <Board onSquareClick={onSquareClick} pieces={pieces} />
    {selectedSquare ? <p>Selected Square: {selectedSquare}</p> : null}
    <p>Current Turn: {turn}</p>
  </div>
  );
}

export default App;