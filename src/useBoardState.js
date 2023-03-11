import React, { useState } from "react";
import { getMovesForPiece } from "./utils/getMovesForPiece";
import { getMovesThatStopCheck } from "./utils/getMovesThatStopCheck";
import { findKing } from "./utils/findKing";
import { isSquareUnderAttack } from "./utils/isSquareUnderAttack";

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

      // if king is in check, only allow moves that stop check
      const kingPos = findKing(pieces, turn);
      if (isSquareUnderAttack(kingPos, turn, pieces)) {
        setLegalMoves(getMovesThatStopCheck(piece, pieces));
      } else {
        setLegalMoves(getMovesForPiece(piece, pieces));
      }
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

        // check if it was a castle move and move rook accordingly
        else if (selectedPiece.type === "k") {
          const [row] = selectedPiece.position
            .split(",")
            .map((num) => parseInt(num, 10));
          if (squareKey === `${row},2`) {
            // queenside castle
            newPieces = newPieces.map((p) => {
              if (
                p.type === "r" &&
                p.color === selectedPiece.color &&
                p.position === `${row},0`
              ) {
                return { ...p, position: `${row},3` };
              }
              return p;
            });
          } else if (squareKey === `${row},6`) {
            // kingside castle
            newPieces = newPieces.map((p) => {
              if (
                p.type === "r" &&
                p.color === selectedPiece.color &&
                p.position === `${row},7`
              ) {
                return { ...p, position: `${row},5` };
              }
              return p;
            });
          }
        }

        // check if it was a en passant move and capture pawn accordingly
        else if (selectedPiece.type === "p") {
          const [row, col] = selectedPiece.position
            .split(",")
            .map((num) => parseInt(num, 10));
          const [newRow, newCol] = squareKey
            .split(",")
            .map((num) => parseInt(num, 10));
          if (Math.abs(newCol - col) === 1 && Math.abs(newRow - row) === 1) {
            // get the pawn behind the selected square and remove it
            const pawnBehindSquare = newPieces.find(
              (p) =>
                p.type === "p" &&
                p.color !== selectedPiece.color &&
                p.position === `${row},${newCol}`
            );
            newPieces = newPieces.filter((p) => p !== pawnBehindSquare);
          } else {
            // check if it was a promotion move and promote pawn accordingly
            if (newRow === 0 || newRow === 7) {
              // promote pawn
              newPieces = newPieces.map((p) => {
                if (
                  p.color === selectedPiece.color &&
                  p.position === squareKey
                ) {
                  return { ...p, type: "q" };
                }
                return p;
              });
            }
          }
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

  // const [pieces, setPieces] = useState([
  //   { type: "k", color: "black", position: "7,0", moveCount: 0 },
  //   { type: "k", color: "white", position: "3,2", moveCount: 0 },
  //   { type: "q", color: "white", position: "6,3", moveCount: 0 },
  // ]);

  const [pieces, setPieces] = useState([
    { type: "r", color: "white", position: "0,0", moveCount: 0 },
    { type: "n", color: "white", position: "0,1", moveCount: 0 },
    { type: "b", color: "white", position: "0,2", moveCount: 0 },
    { type: "q", color: "white", position: "0,3", moveCount: 0 },
    { type: "k", color: "white", position: "0,4", moveCount: 0 },
    { type: "b", color: "white", position: "0,5", moveCount: 0 },
    { type: "n", color: "white", position: "0,6", moveCount: 0 },
    { type: "r", color: "white", position: "0,7", moveCount: 0 },
    { type: "p", color: "white", position: "1,0", moveCount: 0 },
    { type: "p", color: "white", position: "1,1", moveCount: 0 },
    { type: "p", color: "white", position: "1,2", moveCount: 0 },
    { type: "p", color: "white", position: "1,3", moveCount: 0 },
    { type: "p", color: "white", position: "1,4", moveCount: 0 },
    { type: "p", color: "white", position: "1,5", moveCount: 0 },
    { type: "p", color: "white", position: "1,6", moveCount: 0 },
    { type: "p", color: "white", position: "1,7", moveCount: 0 },
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
