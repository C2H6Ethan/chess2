import { findKing } from "./findKing";
import { isSquareUnderAttack } from "./isSquareUnderAttack";

export const isCheck = (pieces, kingColor) => {
  const enemyColor = kingColor === "white" ? "black" : "white";
  const kingPos = findKing(pieces, kingColor);

  return isSquareUnderAttack(kingPos, enemyColor, pieces);
};
