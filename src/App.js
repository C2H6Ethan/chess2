import React, { useState, useEffect } from "react";
import Board from "./Board";
import useBoardState from "./useBoardState";
import WinnerModal from "./components/winnerModal";
import { isCheckmate } from "./legalMovesCalculations";

function App() {
  const [isRGBMode, setIsRGBMode] = useState(false);
  const [showWinnerModal, setShowWinnerModal] = useState(false);
  const {
    selectedSquare,
    selectedPiece,
    pieces,
    turn,
    legalMoves,
    onSquareClick,
  } = useBoardState();

  useEffect(() => {
    const isCheckmateResult = isCheckmate(pieces);
    setShowWinnerModal(isCheckmateResult);
  }, [turn]);

  return (
    <div>
      <Board
        onSquareClick={onSquareClick}
        pieces={pieces}
        legalMoves={legalMoves}
        isRGBMode={isRGBMode}
      />
      <div
        style={{ display: "flex", justifyContent: "center", margin: "10px 0" }}
      >
        <label style={{ marginRight: "10px" }}>RGB Mode:</label>
        <input
          type="checkbox"
          checked={isRGBMode}
          onChange={() => setIsRGBMode(!isRGBMode)}
        />
      </div>
      {selectedSquare ? <p>Selected Square: {selectedSquare}</p> : null}
      <p>Current Turn: {turn}</p>
      {showWinnerModal && (
        <WinnerModal
          isOpen={showWinnerModal}
          onRequestClose={() => setShowWinnerModal(false)}
          winner={turn === "white" ? "Black" : "White"}
        />
      )}
    </div>
  );
}

export default App;
