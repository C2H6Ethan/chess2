import {
  getPawnMoves,
  getKnightMoves,
  getRookMoves,
  getBishopMoves,
  getQueenMoves,
  getKingMoves,
} from "./legalMovesCalculations";
import { simulateMove } from "./simulateMove";
import { findKing } from "./findKing";
import { isSquareUnderAttack } from "./isSquareUnderAttack";

export const getMovesForPiece = (selectedPiece, pieces) => {
  let possibleMoves = [];
  let moves = [];

  switch (selectedPiece.type) {
    case "p":
      possibleMoves = getPawnMoves(
        selectedPiece.position,
        selectedPiece.color,
        pieces
      );
      break;
    case "n":
      possibleMoves = getKnightMoves(
        selectedPiece.position,
        selectedPiece.color,
        pieces
      );
      break;
    case "b":
      possibleMoves = getBishopMoves(
        selectedPiece.position,
        selectedPiece.color,
        pieces
      );
      break;
    case "r":
      possibleMoves = getRookMoves(
        selectedPiece.position,
        selectedPiece.color,
        pieces
      );
      break;
    case "q":
      possibleMoves = getQueenMoves(
        selectedPiece.position,
        selectedPiece.color,
        pieces
      );
      break;
    case "k":
      possibleMoves = getKingMoves(
        selectedPiece.position,
        selectedPiece.color,
        pieces,
        false
      );
      break;
  }

  // check if any of the possible moves result in the king being in check
  for (const move of possibleMoves) {
    const simulatedPieces = simulateMove(selectedPiece.position, move, pieces);
    // check if the king is in check
    const kingPos = findKing(simulatedPieces, selectedPiece.color);
    if (!isSquareUnderAttack(kingPos, selectedPiece.color, simulatedPieces)) {
      moves.push(move);
    }
  }

  return moves;
};
