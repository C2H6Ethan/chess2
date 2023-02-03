import React, { useState } from 'react';
import { getPawnMoves } from './legalMovesCalculations';

export default function useBoardState() {
  const [selectedSquare, setSelectedSquare] = useState(null);
  const [selectedPiece, setSelectedPiece] = useState(null);
  const [turn, setTurn] = useState('white');
  const [legalMoves, setLegalMoves] = useState([]);

  const onSquareClick = (squareKey, piece) => {
    if (!selectedPiece) {
      if (!piece || piece.color !== turn) {
        return;
      }
      setSelectedPiece(piece);
      setSelectedSquare(squareKey);
      if(piece.type == "P" || piece.type == "p"){
        setLegalMoves(getPawnMoves(piece, pieces));
      }
    } else {
      // check if move is legal
      if (legalMoves.includes(squareKey)) {
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
        setLegalMoves([]);
      }
      else{
        // not legal move
        setSelectedPiece(null);
        setSelectedSquare(null);
        setLegalMoves([]);
      }
    }
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
    legalMoves,
    onSquareClick,
  };
}
