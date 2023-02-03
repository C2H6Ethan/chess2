export const getPawnMoves = (selectedPiece, pieces) => {
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

    return moves;
};


export const getPieceAt = (position, pieces) => {
    return pieces.find(piece => piece.position === position);   
};
  