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

  return moves;
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

const getKingMoves = (position, color, pieces) => {
  const [row, col] = position.split(",").map((num) => parseInt(num, 10));
  const moves = [];

  // check for castling
  
  if (selectedPiece.moveCount === 0 && !isSquareUnderAttack(position, pieces)) {
    // check for king-side castling
    const rook = getPieceAt(`${row},${7}`, pieces);
    if (rook && rook.moveCount === 0) {
      const squaresBetween = getSquaresBetween(`${row},${col}`, `${row},${7}`);
      if (
        squaresBetween.length === 0 &&
        !isSquareUnderAttack(`${row},${col + 1}`, pieces) &&
        !isSquareUnderAttack(`${row},${col + 2}`, pieces)
      ) {
        moves.push(`${row},${col + 2}`);
      }
    }

  //   // check for queen-side castling
  //   const queenRook = getPieceAt(`${row},${0}`, pieces);
  //   if (queenRook && queenRook.moveCount === 0) {
  //     const squaresBetween = getSquaresBetween(`${row},${col}`, `${row},${0}`);
  //     if (
  //       squaresBetween.length === 0 &&
  //       !isSquareUnderAttack(`${row},${col - 1}`, pieces) &&
  //       !isSquareUnderAttack(`${row},${col - 2}`, pieces) &&
  //       !isSquareUnderAttack(`${row},${col - 3}`, pieces)
  //     ) {
  //       moves.push(`${row},${col - 2}`);
  //     }
  //   }
  // }

  // check for regular moves
  for (let i = row - 1; i <= row + 1; i++) {
    for (let j = col - 1; j <= col + 1; j++) {
      if (i >= 0 && i <= 7 && j >= 0 && j <= 7) {
        const targetPiece = getPieceAt(`${i},${j}`, pieces);
        if (!targetPiece || targetPiece.color !== color) {
          moves.push(`${i},${j}`);
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
  const kingMoves = getKingMoves(square, color, pieces);
  for (const element of kingMoves) {
    const king = getPieceAt(element, pieces);
    if (king && king.type === "k" && king.color !== color) {
      return true;
    }
  }

  return false;
};

export const getSquaresBetween = (start, end) => {
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

const getSquareColor = (position) => {
  const [row, col] = position.split(",").map(Number);
  // If the row and column add up to an even number, the square is white
  if ((row + col) % 2 === 0) {
    return "white";
  } else {
    return "black";
  }
};

export const isCheck = (pieces, kingColor) => {
  const enemyColor = kingColor === "white" ? "black" : "white";
  const kingPos = findKing(pieces, kingColor);
  const enemyPieces = pieces.filter((piece) => piece.color === enemyColor);

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

const findKing = (pieces, color) => {
  const king = pieces.find(
    (piece) => piece.color === color && piece.type === "k"
  );
  return king.position;
};

export const getMovesForPiece = (selectedPiece, pieces) => {
  switch (selectedPiece.type) {
    case "p":
      return getPawnMoves(selectedPiece.position, selectedPiece.color, pieces);
    case "n":
      return getKnightMoves(
        selectedPiece.position,
        selectedPiece.color,
        pieces
      );
    case "b":
      return getBishopMoves(
        selectedPiece.position,
        selectedPiece.color,
        pieces
      );
    case "r":
      return getRookMoves(selectedPiece.position, selectedPiece.color, pieces);
    case "q":
      return getQueenMoves(selectedPiece.position, selectedPiece.color, pieces);
    case "k":
      return getKingMoves(selectedPiece.position, selectedPiece.color, pieces);
    default:
      return [];
  }
};
