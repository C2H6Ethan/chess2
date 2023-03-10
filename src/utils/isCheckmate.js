import { isCheck } from "./isCheck.js";
import { findKing } from "./findKing.js";
import { getKingMoves } from "./legalMovesCalculations.js";

export const isCheckmate = (pieces) => {
  // check if king is in check for both colors
  const whiteKingInCheck = isCheck(pieces, "white");
  const blackKingInCheck = isCheck(pieces, "black");
  // if neither king is in check, return false
  if (!whiteKingInCheck && !blackKingInCheck) {
    return false;
  } else {
    // if one king is in check, check if it is checkmate
    const kingColor = whiteKingInCheck ? "white" : "black";
    // get all legal moves for the checked king
    const kingPos = findKing(pieces, kingColor);
    const kingMoves = getKingMoves(kingPos, kingColor, pieces);
    // if kingMoves is empty, checkmate
    if (kingMoves.length === 0) {
      return true;
    }
  }

  return false;
};
