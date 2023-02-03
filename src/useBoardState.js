import React, { useState } from 'react';

export default function useBoardState() {
  const [selectedSquare, setSelectedSquare] = useState(null);
  const [selectedPiece, setSelectedPiece] = useState(null);
  const [turn, setTurn] = useState('white');

  const onSquareClick = (squareKey, piece) => {
    if (!selectedPiece) {
      if (!piece || piece.color !== turn) {
        return;
      }
      setSelectedPiece(piece);
      setSelectedSquare(squareKey);
      if(piece.type == "P" || piece.type == "p"){
        var moves = getPawnMoves(piece);
        console.log(moves);
      }
    } else {
      // move piece to new square
      const newPieces = pieces.map(p => {
        if (p === selectedPiece) {
          return { ...p, position: squareKey };
        }
        return p;
      });
      setPieces(newPieces);
      setSelectedPiece(null);
      setSelectedSquare(null);
      setTurn(turn === 'white' ? 'black' : 'white');
    }
  };

  const getPawnMoves = (selectedPiece) => {
    const position = selectedPiece.position;
    const [row, col] = position.split(',').map(num => parseInt(num, 10));
    const moves = [];
  
    const direction = selectedPiece.color === 'white' ? 1 : -1;
    const nextRow = row + direction;
  
    // move one square forward
    if (!getPieceAt(`${nextRow},${col}`)) {
      moves.push(`${nextRow},${col}`);
    }
  
    // move two squares forward from starting position
    if ((selectedPiece.color === 'white' && row === 1) || (selectedPiece.color === 'black' && row === 6)) {
      const secondRow = row + 2 * direction;
      if (!getPieceAt(`${secondRow},${col}`)) {
        moves.push(`${secondRow},${col}`);
      }
    }
  
    // capture diagonally
    const captureMoves = [[nextRow, col + 1], [nextRow, col - 1]].filter(([r, c]) => {
      return r >= 0 && r <= 7 && c >= 0 && c <= 7;
    });
    captureMoves.forEach(([r, c]) => {
      const capturedPiece = getPieceAt(`${r},${c}`);
      if (capturedPiece && capturedPiece.color !== selectedPiece.color) {
        moves.push(`${r},${c}`);
      }
    });
  
    return moves;
  };
  
  const getPieceAt = (position) => {
    return pieces.find(piece => piece.position === position);
  };
  

  

  const [pieces, setPieces] = useState([
    { type: 'P', color: 'black', position: '6,0' },
    { type: 'P', color: 'black', position: '6,1' },
    { type: 'P', color: 'black', position: '6,2' },
    { type: 'P', color: 'black', position: '6,3' },
    { type: 'P', color: 'black', position: '6,4' },
    { type: 'P', color: 'black', position: '6,5' },
    { type: 'P', color: 'black', position: '6,6' },
    { type: 'P', color: 'black', position: '6,7' },
    { type: 'p', color: 'white', position: '1,0' },
    { type: 'p', color: 'white', position: '1,1' },
    { type: 'p', color: 'white', position: '1,2' },
    { type: 'p', color: 'white', position: '1,3' },
    { type: 'p', color: 'white', position: '1,4' },
    { type: 'p', color: 'white', position: '1,5' },
    { type: 'p', color: 'white', position: '1,6' },
    { type: 'p', color: 'white', position: '1,7' },
    { type: 'R', color: 'black', position: '7,0' },
    { type: 'N', color: 'black', position: '7,1' },
    { type: 'B', color: 'black', position: '7,2' },
    { type: 'Q', color: 'black', position: '7,3' },
    { type: 'K', color: 'black', position: '7,4' },
    { type: 'B', color: 'black', position: '7,5' },
    { type: 'N', color: 'black', position: '7,6' },
    { type: 'R', color: 'black', position: '7,7' },
    { type: 'r', color: 'white', position: '0,0' },
    { type: 'n', color: 'white', position: '0,1' },
    { type: 'b', color: 'white', position: '0,2' },
    { type: 'q', color: 'white', position: '0,3' },
    { type: 'k', color: 'white', position: '0,4' },
    { type: 'b', color: 'white', position: '0,5' },
    { type: 'n', color: 'white', position: '0,6' },
    { type: 'r', color: 'white', position: '0,7' },
  ]);
  

  return {
    selectedSquare,
    selectedPiece,
    pieces,
    turn,
    getPawnMoves,
    onSquareClick,
  };
}
