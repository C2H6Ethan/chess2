import { getPieceAt } from "./getPieceAt";
import { isCheck } from "./isCheck";
import { isSquareUnderAttack } from "./isSquareUnderAttack";
import { getSquaresBetween } from "./getSquaresBetween";

export const getPawnMoves = (position, color, pieces) => {
  const [row, col] = position.split(",").map((num) => parseInt(num, 10));
  const moves = [];

  const direction = color === "white" ? 1 : -1;
  const nextRow = row + direction;

  // move one square forward
  if (!getPieceAt(`${nextRow},${col}`, pieces)) {
    moves.push(`${nextRow},${col}`);
  }

  // move two squares forward from starting position
  if ((color === "white" && row === 1) || (color === "black" && row === 6)) {
    const secondRow = row + 2 * direction;
    if (!getPieceAt(`${secondRow},${col}`, pieces)) {
      moves.push(`${secondRow},${col}`);
    }
  }

  // capture diagonally
  const captureMoves = [
    [nextRow, col + 1],
    [nextRow, col - 1],
  ].filter(([r, c]) => {
    return r >= 0 && r <= 7 && c >= 0 && c <= 7;
  });
  captureMoves.forEach(([r, c]) => {
    const capturedPiece = getPieceAt(`${r},${c}`, pieces);
    if (capturedPiece && capturedPiece.color !== color) {
      moves.push(`${r},${c}`);
    }
  });

  //add en passant moves
  const enPassantMoves = getEnPassantMoves(position, color, pieces);
  moves.push(...enPassantMoves);

  return moves;
};

export const getEnPassantMoves = (position, color, pieces) => {
  // check the pawn is in the correct row
  const [row, col] = position.split(",").map((num) => parseInt(num, 10));
  if ((color === "white" && row !== 4) || (color === "black" && row !== 3)) {
    return [];
  }

  // check if there is an enemy pawn next to it that moved two squares
  const pawns = [
    getPieceAt(`${row},${col + 1}`, pieces),
    getPieceAt(`${row},${col - 1}`, pieces),
  ].filter(
    (p) => p && p.type === "p" && p.color !== color && p.moveCount === 1
  );
  if (pawns.length === 0) {
    return [];
  }

  // get the squares behind the enemy pawns
  const direction = color === "white" ? 1 : -1;
  const enPassantSquares = pawns.map((p) => {
    const [r, c] = p.position.split(",").map((num) => parseInt(num, 10));
    return `${r + direction},${c}`;
  });

  return enPassantSquares;
};

export const getKnightMoves = (position, color, pieces) => {
  const [row, col] = position.split(",").map((num) => parseInt(num, 10));
  const moves = [];

  const moveDirections = [
    [-2, -1],
    [-2, 1],
    [-1, -2],
    [-1, 2],
    [1, -2],
    [1, 2],
    [2, -1],
    [2, 1],
  ];

  moveDirections.forEach(([r, c]) => {
    const newRow = row + r;
    const newCol = col + c;
    if (newRow >= 0 && newRow <= 7 && newCol >= 0 && newCol <= 7) {
      const targetPiece = getPieceAt(`${newRow},${newCol}`, pieces);
      if (!targetPiece || targetPiece.color !== color) {
        moves.push(`${newRow},${newCol}`);
      }
    }
  });

  return moves;
};

export const getRookMoves = (position, color, pieces) => {
  const [row, col] = position.split(",").map((num) => parseInt(num, 10));
  const moves = [];

  // move up
  for (let i = row - 1; i >= 0; i--) {
    const targetPiece = getPieceAt(`${i},${col}`, pieces);
    if (!targetPiece) {
      moves.push(`${i},${col}`);
    } else {
      if (targetPiece.color !== color) {
        moves.push(`${i},${col}`);
      }
      break;
    }
  }

  // move down
  for (let i = row + 1; i <= 7; i++) {
    const targetPiece = getPieceAt(`${i},${col}`, pieces);
    if (!targetPiece) {
      moves.push(`${i},${col}`);
    } else {
      if (targetPiece.color !== color) {
        moves.push(`${i},${col}`);
      }
      break;
    }
  }

  // move left
  for (let i = col - 1; i >= 0; i--) {
    const targetPiece = getPieceAt(`${row},${i}`, pieces);
    if (!targetPiece) {
      moves.push(`${row},${i}`);
    } else {
      if (targetPiece.color !== color) {
        moves.push(`${row},${i}`);
      }
      break;
    }
  }

  // move right
  for (let i = col + 1; i <= 7; i++) {
    const targetPiece = getPieceAt(`${row},${i}`, pieces);
    if (!targetPiece) {
      moves.push(`${row},${i}`);
    } else {
      if (targetPiece.color !== color) {
        moves.push(`${row},${i}`);
      }
      break;
    }
  }

  return moves;
};

export const getBishopMoves = (position, color, pieces) => {
  const [row, col] = position.split(",").map((num) => parseInt(num, 10));
  const moves = [];

  const moveDirections = [
    [-1, -1],
    [-1, 1],
    [1, -1],
    [1, 1],
  ];

  moveDirections.forEach(([r, c]) => {
    let newRow = row + r;
    let newCol = col + c;
    while (newRow >= 0 && newRow <= 7 && newCol >= 0 && newCol <= 7) {
      const targetPiece = getPieceAt(`${newRow},${newCol}`, pieces);
      if (!targetPiece) {
        moves.push(`${newRow},${newCol}`);
      } else if (targetPiece.color !== color) {
        moves.push(`${newRow},${newCol}`);
        break;
      } else {
        break;
      }
      newRow += r;
      newCol += c;
    }
  });

  return moves;
};

export const getQueenMoves = (position, color, pieces) => {
  const [row, col] = position.split(",").map((num) => parseInt(num, 10));
  const moves = [];

  // move up
  for (let i = row - 1; i >= 0; i--) {
    const targetPiece = getPieceAt(`${i},${col}`, pieces);
    if (!targetPiece) {
      moves.push(`${i},${col}`);
    } else {
      if (targetPiece.color !== color) {
        moves.push(`${i},${col}`);
      }
      break;
    }
  }

  // move down
  for (let i = row + 1; i <= 7; i++) {
    const targetPiece = getPieceAt(`${i},${col}`, pieces);
    if (!targetPiece) {
      moves.push(`${i},${col}`);
    } else {
      if (targetPiece.color !== color) {
        moves.push(`${i},${col}`);
      }
      break;
    }
  }

  // move left
  for (let i = col - 1; i >= 0; i--) {
    const targetPiece = getPieceAt(`${row},${i}`, pieces);
    if (!targetPiece) {
      moves.push(`${row},${i}`);
    } else {
      if (targetPiece.color !== color) {
        moves.push(`${row},${i}`);
      }
      break;
    }
  }

  // move right
  for (let i = col + 1; i <= 7; i++) {
    const targetPiece = getPieceAt(`${row},${i}`, pieces);
    if (!targetPiece) {
      moves.push(`${row},${i}`);
    } else {
      if (targetPiece.color !== color) {
        moves.push(`${row},${i}`);
      }
      break;
    }
  }

  // move up-left
  for (let i = 1; row - i >= 0 && col - i >= 0; i++) {
    const targetPiece = getPieceAt(`${row - i},${col - i}`, pieces);
    if (!targetPiece) {
      moves.push(`${row - i},${col - i}`);
    } else {
      if (targetPiece.color !== color) {
        moves.push(`${row - i},${col - i}`);
      }
      break;
    }
  }

  // move up-right
  for (let i = 1; row - i >= 0 && col + i <= 7; i++) {
    const targetPiece = getPieceAt(`${row - i},${col + i}`, pieces);
    if (!targetPiece) {
      moves.push(`${row - i},${col + i}`);
    } else {
      if (targetPiece.color !== color) {
        moves.push(`${row - i},${col + i}`);
      }
      break;
    }
  }

  // move down-left
  for (let i = 1; row + i <= 7 && col - i >= 0; i++) {
    const targetPiece = getPieceAt(`${row + i},${col - i}`, pieces);
    if (!targetPiece) {
      moves.push(`${row + i},${col - i}`);
    } else {
      if (targetPiece.color !== color) {
        moves.push(`${row + i},${col - i}`);
      }
      break;
    }
  }

  // move down-right
  for (let i = 1; row + i <= 7 && col + i <= 7; i++) {
    const targetPiece = getPieceAt(`${row + i},${col + i}`, pieces);
    if (!targetPiece) {
      moves.push(`${row + i},${col + i}`);
    } else {
      if (targetPiece.color !== color) {
        moves.push(`${row + i},${col + i}`);
      }
      break;
    }
  }

  return moves;
};

export const getKingMoves = (
  position,
  color,
  pieces,
  checkingIfSquareIsUnderAttack
) => {
  const [row, col] = position.split(",").map((num) => parseInt(num, 10));
  const moves = [];

  const king = getPieceAt(position, pieces);
  if (king && king.type == "k" && king.color == color) {
    const kingSideRook = getPieceAt(`${row},7`, pieces);
    const queenSideRook = getPieceAt(`${row},0`, pieces);

    // check for king side castling
    if (
      kingSideRook &&
      kingSideRook.type == "r" &&
      kingSideRook.color == color
    ) {
      // check if king and rook haven't moved
      if (king.moveCount === 0 && kingSideRook.moveCount === 0) {
        // check if the king is not currently in check
        if (!isCheck(pieces, color)) {
          // check if there are no pieces in between and the king does not pass through or finish on a square that is attacked by an enemy piece.
          const squaresBetween = getSquaresBetween(
            king.position,
            kingSideRook.position
          );
          const hasPiecesInBetween = squaresBetween.some((square) =>
            getPieceAt(square, pieces)
          );
          const isBeingAttacked = squaresBetween.some((square) =>
            isSquareUnderAttack(square, color, pieces)
          );
          if (!hasPiecesInBetween && !isBeingAttacked) {
            moves.push(`${row},6`);
          }
        }
      }
    }

    // check for queen side castling
    if (
      queenSideRook &&
      queenSideRook.type == "r" &&
      queenSideRook.color == color
    ) {
      // check if king and rook haven't moved
      if (king.moveCount === 0 && queenSideRook.moveCount === 0) {
        // check if the king is not currently in check
        if (!isCheck(pieces, color)) {
          // check if there are no pieces in between and the king does not pass through or finish on a square that is attacked by an enemy piece.
          const squaresBetween = getSquaresBetween(
            king.position,
            queenSideRook.position
          );
          const hasPiecesInBetween = squaresBetween.some((square) =>
            getPieceAt(square, pieces)
          );
          // only check the squares the king is traveling through
          const isBeingAttacked = squaresBetween
            .slice(0, -1)
            .some((square) => isSquareUnderAttack(square, color, pieces));

          if (!hasPiecesInBetween && !isBeingAttacked) {
            moves.push(`${row},2`);
          }
        }
      }
    }
  }

  // check for regular moves
  for (let i = row - 1; i <= row + 1; i++) {
    for (let j = col - 1; j <= col + 1; j++) {
      if (i >= 0 && i <= 7 && j >= 0 && j <= 7) {
        const targetPiece = getPieceAt(`${i},${j}`, pieces);
        if (!targetPiece || targetPiece.color !== color) {
          // if checking if square is under attack, dont check isSquareUnderAttack again
          if (checkingIfSquareIsUnderAttack) {
            moves.push(`${i},${j}`);
          } else {
            // remove the king from the pieces array so the king can't avoid check by moving behind itself
            const piecesWithoutKing = pieces.filter(
              (piece) => piece.type !== "k"
            );
            if (!isSquareUnderAttack(`${i},${j}`, color, piecesWithoutKing)) {
              moves.push(`${i},${j}`);
            }
          }
        }
      }
    }
  }

  return moves;
};
