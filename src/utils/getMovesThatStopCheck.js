import { getMovesForPiece } from "./getMovesForPiece";
import { simulateMove } from "./simulateMove";
import { findKing } from "./findKing";
import { isSquareUnderAttack } from "./isSquareUnderAttack";

export const getMovesThatStopCheck = (piece, pieces) => {
  const movesThatStopCheck = [];

  // check the specified piece for moves that stop check
  const pieceMoves = getMovesForPiece(piece, pieces);

  // loop over all possible moves for the piece
  for (const move of pieceMoves) {
    // simulate the move and see if the opponent's king is still in check
    const simulatedPieces = simulateMove(piece.position, move, pieces);

    const kingPos = findKing(simulatedPieces, piece.color);
    if (!isSquareUnderAttack(kingPos, piece.color, simulatedPieces)) {
      // if the king is not in check after the move, add it to the result
      movesThatStopCheck.push(move);
    }
  }

  return movesThatStopCheck;
};
