const getPawnMoves = (selectedPiece, pieces, lastMove) => {
    const position = selectedPiece.position;
    const [row, col] = position.split(',').map(num => parseInt(num, 10));
    const moves = [];
  
    const direction = selectedPiece.color === 'white' ? 1 : -1;
    const nextRow = row + direction;
  
    // move one square forward
    if (!getPieceAt(`${nextRow},${col}`, pieces)) {
      moves.push(`${nextRow},${col}`);
    }
  
    // move two squares forward from starting position
    if ((selectedPiece.color === 'white' && row === 1) || (selectedPiece.color === 'black' && row === 6)) {
      const secondRow = row + 2 * direction;
      if (!getPieceAt(`${secondRow},${col}`, pieces)) {
        moves.push(`${secondRow},${col}`);
      }
    }
  
    // capture diagonally
    const captureMoves = [[nextRow, col + 1], [nextRow, col - 1]].filter(([r, c]) => {
      return r >= 0 && r <= 7 && c >= 0 && c <= 7;
    });
    captureMoves.forEach(([r, c]) => {
      const capturedPiece = getPieceAt(`${r},${c}`, pieces);
      if (capturedPiece && capturedPiece.color !== selectedPiece.color) {
        moves.push(`${r},${c}`);
      }
    });
  
    // En passant move
    if (lastMove) {
      console.log(lastMove)
      const [fromRow, fromCol] = lastMove.from.split(',').map(num => parseInt(num, 10));
      const [toRow, toCol] = lastMove.to.split(',').map(num => parseInt(num, 10));
      const [row, col] = selectedPiece.position.split(',').map(num => parseInt(num, 10));
      if (Math.abs(toRow - fromRow) === 2 && Math.abs(toCol - col) === 1) {
        // Check if the last move was a two square pawn advance
        // and the pawn is on an adjacent file
        const capturedRow = selectedPiece.color === 'white' ? toRow + 1 : toRow - 1;
        moves.push(`${capturedRow},${toCol}`);
      }
    }
  
    return moves;
  };
  

const getKnightMoves = (selectedPiece, pieces) => {
    const position = selectedPiece.position;
    const [row, col] = position.split(',').map(num => parseInt(num, 10));
    const moves = [];

    const moveDirections = [[-2, -1], [-2, 1], [-1, -2], [-1, 2], [1, -2], [1, 2], [2, -1], [2, 1]];

    moveDirections.forEach(([r, c]) => {
        const newRow = row + r;
        const newCol = col + c;
        if (newRow >= 0 && newRow <= 7 && newCol >= 0 && newCol <= 7) {
            const targetPiece = getPieceAt(`${newRow},${newCol}`, pieces);
            if (!targetPiece || targetPiece.color !== selectedPiece.color) {
                moves.push(`${newRow},${newCol}`);
            }
        }
    });

    return moves;
};

const getRookMoves = (selectedPiece, pieces) => {
    const position = selectedPiece.position;
    const [row, col] = position.split(",").map((num) => parseInt(num, 10));
    const moves = [];

    // move up
    for (let i = row - 1; i >= 0; i--) {
        const targetPiece = getPieceAt(`${i},${col}`, pieces);
        if (!targetPiece) {
        moves.push(`${i},${col}`);
        } else {
        if (targetPiece.color !== selectedPiece.color) {
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
        if (targetPiece.color !== selectedPiece.color) {
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
        if (targetPiece.color !== selectedPiece.color) {
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
        if (targetPiece.color !== selectedPiece.color) {
            moves.push(`${row},${i}`);
        }
        break;
        }
    }

    return moves;
};  

const getBishopMoves = (selectedPiece, pieces) => {
    const position = selectedPiece.position;
    const [row, col] = position.split(',').map(num => parseInt(num, 10));
    const moves = [];
    
    const moveDirections = [[-1, -1], [-1, 1], [1, -1], [1, 1]];
    
    moveDirections.forEach(([r, c]) => {
        let newRow = row + r;
        let newCol = col + c;
        while (newRow >= 0 && newRow <= 7 && newCol >= 0 && newCol <= 7) {
            const targetPiece = getPieceAt(`${newRow},${newCol}`, pieces);
            if (!targetPiece) {
                moves.push(`${newRow},${newCol}`);
            } else if (targetPiece.color !== selectedPiece.color) {
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

const getQueenMoves = (selectedPiece, pieces) => {
    const position = selectedPiece.position;
    const [row, col] = position.split(",").map((num) => parseInt(num, 10));
    const moves = [];
  
    // move up
    for (let i = row - 1; i >= 0; i--) {
      const targetPiece = getPieceAt(`${i},${col}`, pieces);
      if (!targetPiece) {
        moves.push(`${i},${col}`);
      } else {
        if (targetPiece.color !== selectedPiece.color) {
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
        if (targetPiece.color !== selectedPiece.color) {
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
        if (targetPiece.color !== selectedPiece.color) {
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
        if (targetPiece.color !== selectedPiece.color) {
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
        if (targetPiece.color !== selectedPiece.color) {
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
            if (targetPiece.color !== selectedPiece.color) {
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
            if (targetPiece.color !== selectedPiece.color) {
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
            if (targetPiece.color !== selectedPiece.color) {
                moves.push(`${row + i},${col + i}`);
            }
            break;
        }
    }

    return moves;
};
  
const getKingMoves = (selectedPiece, pieces) => {
    const position = selectedPiece.position;
    const [row, col] = position.split(",").map((num) => parseInt(num, 10));
    const moves = [];
  
    for (let i = row - 1; i <= row + 1; i++) {
      for (let j = col - 1; j <= col + 1; j++) {
        if (i >= 0 && i <= 7 && j >= 0 && j <= 7) {
          const targetPiece = getPieceAt(`${i},${j}`, pieces);
          if (!targetPiece || targetPiece.color !== selectedPiece.color) {
            moves.push(`${i},${j}`);
          }
        }
      }
    }
  
    return moves;
};  

const getPieceAt = (position, pieces) => {
    return pieces.find(piece => piece.position === position);   
};

export const isCheck = (pieces, kingColor) => {
    const enemyColor = kingColor === 'white' ? 'black' : 'white';
    const kingPos = findKing(pieces, kingColor);
    const enemyPieces = pieces.filter(piece => piece.color === enemyColor);

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
    const king = pieces.find(piece => piece.color === color && piece.type === 'k');
    return king.position;
};

export const getMovesForPiece = (selectedPiece, pieces, lastMove) => {
    switch (selectedPiece.type) {
      case "p":
        return getPawnMoves(selectedPiece, pieces, lastMove);
      case "n":
        return getKnightMoves(selectedPiece, pieces);
      case "b":
        return getBishopMoves(selectedPiece, pieces);
      case "r":
        return getRookMoves(selectedPiece, pieces);
      case "q":
        return getQueenMoves(selectedPiece, pieces);
      case "k":
        return getKingMoves(selectedPiece, pieces);
      default:
        return [];
    }
  };
  
