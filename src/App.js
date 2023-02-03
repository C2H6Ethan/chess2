import React from 'react';
import Board from './Board';
import useBoardState from './useBoardState';

function App() {
  const {
  selectedSquare,
  selectedPiece,
  pieces,
  turn,
  legalMoves,
  onSquareClick
  } = useBoardState();

return (
  <div>
    <Board onSquareClick={onSquareClick} pieces={pieces} legalMoves={legalMoves}/>
    {selectedSquare ? <p>Selected Square: {selectedSquare}</p> : null}
    <p>Current Turn: {turn}</p>
  </div>
  );
}

export default App;