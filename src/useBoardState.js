import React, { useState } from "react";
import { getMovesForPiece } from "./legalMovesCalculations";

export default function useBoardState() {
  const [selectedSquare, setSelectedSquare] = useState(null);
  const [selectedPiece, setSelectedPiece] = useState(null);
  const [turn, setTurn] = useState("white");
  const [legalMoves, setLegalMoves] = useState([]);

  const onSquareClick = (squareKey, piece) => {
    if (!selectedPiece) {
      if (!piece || piece.color !== turn) {
        return;
      }
      setSelectedPiece(piece);
      setSelectedSquare(squareKey);
      // calculate legal moves
      setLegalMoves(getMovesForPiece(piece, pieces));
    } else {
      // check if move is legal
      if (legalMoves.includes(squareKey)) {
        // move piece to new square
        var newPieces = pieces.map((p) => {
          if (p === selectedPiece) {
            return { ...p, position: squareKey, moveCount: p.moveCount + 1 };
          }
          return p;
        });

        // check if selected square contains opponent's piece
        if (piece && piece.color !== selectedPiece.color) {
          // capture piece
          newPieces = newPieces.filter((p) => p !== piece);
        }

        setPieces(newPieces);
        setSelectedPiece(null);
        setSelectedSquare(null);
        setTurn(turn === "white" ? "black" : "white");
        setLegalMoves([]);
      } else {
        // not legal move
        setSelectedPiece(null);
        setSelectedSquare(null);
        setLegalMoves([]);
      }
    }
  };

  const [pieces, setPieces] = useState([
    { type: "p", color: "black", position: "6,0", moveCount: 0 },
    { type: "p", color: "black", position: "6,1", moveCount: 0 },
    { type: "p", color: "black", position: "6,2", moveCount: 0 },
    { type: "p", color: "black", position: "6,3", moveCount: 0 },
    { type: "p", color: "black", position: "6,4", moveCount: 0 },
    { type: "p", color: "black", position: "6,5", moveCount: 0 },
    { type: "p", color: "black", position: "6,6", moveCount: 0 },
    { type: "p", color: "black", position: "6,7", moveCount: 0 },
    { type: "r", color: "black", position: "7,0", moveCount: 0 },
    { type: "n", color: "black", position: "7,1", moveCount: 0 },
    { type: "b", color: "black", position: "7,2", moveCount: 0 },
    { type: "q", color: "black", position: "7,3", moveCount: 0 },
    { type: "k", color: "black", position: "7,4", moveCount: 0 },
    { type: "b", color: "black", position: "7,5", moveCount: 0 },
    { type: "n", color: "black", position: "7,6", moveCount: 0 },
    { type: "r", color: "black", position: "7,7", moveCount: 0 },
    { type: "p", color: "white", position: "1,0", moveCount: 0 },
    { type: "p", color: "white", position: "1,1", moveCount: 0 },
    { type: "p", color: "white", position: "1,2", moveCount: 0 },
    { type: "p", color: "white", position: "1,3", moveCount: 0 },
    { type: "p", color: "white", position: "1,4", moveCount: 0 },
    { type: "p", color: "white", position: "1,5", moveCount: 0 },
    { type: "p", color: "white", position: "1,6", moveCount: 0 },
    { type: "p", color: "white", position: "1,7", moveCount: 0 },
    { type: "r", color: "white", position: "0,0", moveCount: 0 },
    { type: "n", color: "white", position: "0,1", moveCount: 0 },
    { type: "b", color: "white", position: "0,2", moveCount: 0 },
    { type: "q", color: "white", position: "0,3", moveCount: 0 },
    { type: "k", color: "white", position: "0,4", moveCount: 0 },
    { type: "b", color: "white", position: "0,5", moveCount: 0 },
    { type: "n", color: "white", position: "0,6", moveCount: 0 },
    { type: "r", color: "white", position: "0,7", moveCount: 0 },
  ]);

  return {
    pieces,
    selectedSquare,
    selectedPiece,
    turn,
    legalMoves,
    onSquareClick,
  };
}
