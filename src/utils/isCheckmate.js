import { findKing } from "./findKing.js";
import { getMovesThatStopCheck } from "./getMovesThatStopCheck.js";
import { isSquareUnderAttack } from "./isSquareUnderAttack.js";

export const isCheckmate = (pieces) => {
  // check if king is in check for both colors

  const whiteKingPos = findKing(pieces, "white");
  const blackKingPos = findKing(pieces, "black");

  const whiteKingInCheck = isSquareUnderAttack(whiteKingPos, "white", pieces);
  const blackKingInCheck = isSquareUnderAttack(blackKingPos, "black", pieces);
  // if neither king is in check, return false
  if (!whiteKingInCheck && !blackKingInCheck) {
    return false;
  } else {
    // if one king is in check, check if it is checkmate
    const kingColor = whiteKingInCheck ? "white" : "black";

    // get all legal moves for the checked king
    const kingPos = findKing(pieces, kingColor);
    const kingMoves = getMovesThatStopCheck(
      { type: "k", position: kingPos, color: kingColor },
      pieces
    );
    // if kingMoves is not empty, return false
    if (kingMoves.length > 0) {
      return false;
    }

    // go through each piece that has color equal to the king's color and check if it can move to a square that stops check
    for (const piece of pieces) {
      if (piece.color === kingColor) {
        const moves = getMovesThatStopCheck(piece, pieces);
        if (moves.length > 0) {
          return false;
        }
      }
    }
  }

  return true;
};
