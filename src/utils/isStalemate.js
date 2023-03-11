import { getMovesForPiece } from "./getMovesForPiece.js";

export const isStalemate = (pieces, color) => {
  const filteredPieces = pieces.filter((piece) => piece.color === color);

  for (const piece of filteredPieces) {
    const moves = getMovesForPiece(piece, pieces);
    if (moves.length > 0) {
      return false;
    }
  }

  return true;
};
