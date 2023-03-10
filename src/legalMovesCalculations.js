const getPawnMoves = (position, color, pieces) => {
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

const getEnPassantMoves = (position, color, pieces) => {
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

const getKnightMoves = (position, color, pieces) => {
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

const getRookMoves = (position, color, pieces) => {
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

const getBishopMoves = (position, color, pieces) => {
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

const getQueenMoves = (position, color, pieces) => {
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

const getKingMoves = (
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

const isSquareUnderAttack = (square, color, pieces) => {
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

const getSquaresBetween = (start, end) => {
  const [startRow, startCol] = start.split(",").map((num) => parseInt(num, 10));
  const [endRow, endCol] = end.split(",").map((num) => parseInt(num, 10));
  const squares = [];

  // Check if start and end squares are on a diagonal
  const isDiagonal =
    Math.abs(startRow - endRow) === Math.abs(startCol - endCol);

  if (startRow === endRow) {
    const direction = startCol < endCol ? 1 : -1;
    for (let col = startCol + direction; col !== endCol; col += direction) {
      squares.push(`${startRow},${col}`);
    }
  } else if (startCol === endCol) {
    const direction = startRow < endRow ? 1 : -1;
    for (let row = startRow + direction; row !== endRow; row += direction) {
      squares.push(`${row},${startCol}`);
    }
  } else if (isDiagonal) {
    const rowDirection = startRow < endRow ? 1 : -1;
    const colDirection = startCol < endCol ? 1 : -1;
    let row = startRow + rowDirection;
    let col = startCol + colDirection;
    while (row !== endRow && col !== endCol) {
      squares.push(`${row},${col}`);
      row += rowDirection;
      col += colDirection;
    }
  }

  return squares;
};

const getPieceAt = (position, pieces) => {
  return pieces.find((piece) => piece.position === position);
};

export const isCheck = (pieces, kingColor) => {
  const enemyColor = kingColor === "white" ? "black" : "white";
  const kingPos = findKing(pieces, kingColor);
  const enemyPieces = pieces.filter(
    (piece) => piece.color === enemyColor && piece.type !== "k"
  );

  for (const enemyPiece of enemyPieces) {
    const enemyMoves = getMovesForPiece(enemyPiece, pieces);
    for (const move of enemyMoves) {
      if (move === kingPos) {
        return true;
      }
    }
  }

  return false;
};

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

const findKing = (pieces, color) => {
  const king = pieces.find(
    (piece) => piece.color === color && piece.type === "k"
  );
  return king.position;
};

export const getMovesThatStopCheck = (piece, pieces) => {
  const movesThatStopCheck = [];

  // check the specified piece for moves that stop check
  const pieceMoves = getMovesForPiece(piece, pieces);

  // loop over all possible moves for the piece
  for (const move of pieceMoves) {
    // simulate the move and see if the opponent's king is still in check
    const simulatedPieces = simulateMove(piece.position, move, pieces);
    if (!isCheck(simulatedPieces, piece.color)) {
      // if the king is not in check after the move, add it to the result
      movesThatStopCheck.push(move);
    }
  }

  return movesThatStopCheck;
};

const simulateMove = (from, to, pieces) => {
  // create a copy of the pieces array
  const newPieces = pieces.slice();

  // find the piece being moved and update its position
  const pieceIndex = newPieces.findIndex((p) => p.position === from);
  newPieces[pieceIndex] = { ...newPieces[pieceIndex], position: to };

  return newPieces;
};

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

  // Check each move to see if it leaves the king in check
  for (const move of possibleMoves) {
    // Create a copy of the pieces array with the move applied
    const newPieces = simulateMove(selectedPiece.position, move, pieces);

    // Check if the move leaves the king in check
    const kingColor = selectedPiece.color;
    const kingPos = findKing(newPieces, kingColor);
    const kingInCheck = isSquareUnderAttack(kingPos, kingColor, pieces);

    // If the move doesn't leave the king in check, add it to the list of moves
    if (!kingInCheck) {
      moves.push(move);
    }
  }

  return moves;
};
