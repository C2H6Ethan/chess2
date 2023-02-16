import React, { useState } from 'react';
import Board from './Board';
import useBoardState from './useBoardState';
import { isCheck } from './legalMovesCalculations';

function App() {
  const [isRGBMode, setIsRGBMode] = useState(false);
  const {
    selectedSquare,
    selectedPiece,
    pieces,
    turn,
    legalMoves,
    onSquareClick
  } = useBoardState();

  const check = isCheck(pieces, turn);

  return (
    <div>
      <Board onSquareClick={onSquareClick} pieces={pieces} legalMoves={legalMoves} isRGBMode={isRGBMode} />
      <div style={{ display: 'flex', justifyContent: 'center', margin: '10px 0' }}>
        <label style={{ marginRight: '10px' }}>
          RGB Mode:
        </label>
        <input
          type="checkbox"
          checked={isRGBMode}
          onChange={() => setIsRGBMode(!isRGBMode)}
        />
      </div>
      {selectedSquare ? <p>Selected Square: {selectedSquare}</p> : null}
      <p>Current Turn: {turn}</p>
      {check ? <p>{turn === "white" ? "White" : "Black"} is in check</p> : null}
    </div>
  );
}


export default App;
