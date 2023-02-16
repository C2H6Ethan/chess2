import React, { useState } from 'react';
import { getMovesForPiece } from './legalMovesCalculations';

export default function useBoardState() {
  const [selectedSquare, setSelectedSquare] = useState(null);
  const [selectedPiece, setSelectedPiece] = useState(null);
  const [turn, setTurn] = useState('white');
  const [legalMoves, setLegalMoves] = useState([]);
  const [enPassantSquare, setEnPassantSquare] = useState(null);
  const [lastMove, setLastMove] = useState(null);

  const onSquareClick = (squareKey, piece) => {
    if (!selectedPiece) {
      if (!piece || piece.color !== turn) {
        return;
      }
      setSelectedPiece(piece);
      setSelectedSquare(squareKey);
      // calculate legal moves
      setLegalMoves(getMovesForPiece(piece, pieces, lastMove));
    } else {
      // check if move is legal
      if (legalMoves.includes(squareKey)) {
        // move piece to new square
        var newPieces = pieces.map(p => {
          if (p === selectedPiece) {
            return { ...p, position: squareKey };
          }
          return p;
        });

        // check if selected square contains opponent's piece
        if (piece && piece.color !== selectedPiece.color) {
          // capture piece
          newPieces = newPieces.filter(p => p !== piece);
        }

        // Check for en passant
        if (selectedPiece.type === 'p' && squareKey === enPassantSquare) {
          // Find the pawn to be captured and remove it from the pieces list
          newPieces = newPieces.filter(p => p.position !== enPassantSquare);
        }
        
        // Set en passant square if pawn moves 2 squares
        if (selectedPiece.type === 'p' && selectedSquare.split(',')[0] - squareKey.split(',')[0] === 2) {
          selectedPiece.color === 'white' ? setEnPassantSquare(`${(parseInt(squareKey.split(',')[0])+ 1)},${squareKey.split(',')[1]}`): setEnPassantSquare(`${(parseInt(squareKey.split(',')[0])- 1)},${squareKey.split(',')[1]}`);
        } else {
          setEnPassantSquare(null);
        }

        setPieces(newPieces);
        var currentMove = {from: selectedSquare, to: squareKey};
        setLastMove(currentMove);
        setSelectedPiece(null);
        setSelectedSquare(null);
        setTurn(turn === 'white' ? 'black' : 'white');
        setLegalMoves([]);
      } else {
        // not legal move
        setSelectedPiece(null);
        setSelectedSquare(null);
        setLegalMoves([]);
      }
    }
  };

  const [pieces, setPieces] = useState([
    { type: 'p', color: 'black', position: '6,0' },
    { type: 'p', color: 'black', position: '6,1' },
    { type: 'p', color: 'black', position: '6,2' },
    { type: 'p', color: 'black', position: '6,3' },
    { type: 'p', color: 'black', position: '6,4' },
    { type: 'p', color: 'black', position: '6,5' },
    { type: 'p', color: 'black', position: '6,6' },
    { type: 'p', color: 'black', position: '6,7' },
    { type: 'r', color: 'black', position: '7,0' },
    { type: 'n', color: 'black', position: '7,1' },
    { type: 'b', color: 'black', position: '7,2' },
    { type: 'q', color: 'black', position: '7,3' },
    { type: 'k', color: 'black', position: '7,4' },
    { type: 'b', color: 'black', position: '7,5' },
    { type: 'n', color: 'black', position: '7,6' },
    { type: 'r', color: 'black', position: '7,7' },
    { type: 'p', color: 'white', position: '1,0' },
    { type: 'p', color: 'white', position: '1,1' },
    { type: 'p', color: 'white', position: '1,2' },
    { type: 'p', color: 'white', position: '1,3' },
    { type: 'p', color: 'white', position: '1,4' },
    { type: 'p', color: 'white', position: '1,5' },
    { type: 'p', color: 'white', position: '1,6' },
    { type: 'p', color: 'white', position: '1,7' },
    { type: 'r', color: 'white', position: '0,0' },
    { type: 'n', color: 'white', position: '0,1' },
    { type: 'b', color: 'white', position: '0,2' },
    { type: 'q', color: 'white', position: '0,3' },
    { type: 'k', color: 'white', position: '0,4' },
    { type: 'b', color: 'white', position: '0,5' },
    { type: 'n', color: 'white', position: '0,6' },
    { type: 'r', color: 'white', position: '0,7' }
  ]);

  return {
    pieces,
    selectedSquare,
    selectedPiece,
    turn,
    legalMoves,
    enPassantSquare,
    onSquareClick
  };
}
