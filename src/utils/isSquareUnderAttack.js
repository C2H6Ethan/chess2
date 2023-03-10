import {
  getPawnMoves,
  getKnightMoves,
  getRookMoves,
  getBishopMoves,
  getKingMoves,
} from "./legalMovesCalculations";
import { getPieceAt } from "./getPieceAt";

export const isSquareUnderAttack = (square, color, pieces) => {
  // check for pawn attacks
  const pawnAttacks = getPawnMoves(square, color, pieces);
  for (const element of pawnAttacks) {
    const pawn = getPieceAt(element, pieces);
    if (pawn && pawn.type === "p" && pawn.color !== color) {
      return true;
    }
  }

  // check for knight attacks
  const knightMoves = getKnightMoves(square, color, pieces);
  for (const element of knightMoves) {
    const knight = getPieceAt(element, pieces);
    if (knight && knight.type === "n" && knight.color !== color) {
      return true;
    }
  }

  // check for rook/queen attacks (horizontal and vertical)
  const rookMoves = getRookMoves(square, color, pieces);
  for (const element of rookMoves) {
    const rook = getPieceAt(element, pieces);
    if (
      rook &&
      (rook.type === "r" || rook.type === "q") &&
      rook.color !== color
    ) {
      return true;
    }
  }

  // check for bishop/queen attacks (diagonal)
  const bishopMoves = getBishopMoves(square, color, pieces);
  for (const element of bishopMoves) {
    const bishop = getPieceAt(element, pieces);
    if (
      bishop &&
      (bishop.type === "b" || bishop.type === "q") &&
      bishop.color !== color
    ) {
      return true;
    }
  }

  // check for king attacks
  const kingMoves = getKingMoves(square, color, pieces, true);
  for (const element of kingMoves) {
    const king = getPieceAt(element, pieces);
    if (king && king.type === "k" && king.color !== color) {
      return true;
    }
  }

  return false;
};
