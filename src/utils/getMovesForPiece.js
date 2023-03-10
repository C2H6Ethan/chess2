import {
  getPawnMoves,
  getKnightMoves,
  getRookMoves,
  getBishopMoves,
  getQueenMoves,
  getKingMoves,
} from "./legalMovesCalculations";

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
    case "n":
      possibleMoves = getKnightMoves(
        selectedPiece.position,
        selectedPiece.color,
        pieces
      );
    case "b":
      possibleMoves = getBishopMoves(
        selectedPiece.position,
        selectedPiece.color,
        pieces
      );
    case "r":
      possibleMoves = getRookMoves(
        selectedPiece.position,
        selectedPiece.color,
        pieces
      );
    case "q":
      possibleMoves = getQueenMoves(
        selectedPiece.position,
        selectedPiece.color,
        pieces
      );
    case "k":
      possibleMoves = getKingMoves(
        selectedPiece.position,
        selectedPiece.color,
        pieces,
        false
      );
  }
  return moves;
};
