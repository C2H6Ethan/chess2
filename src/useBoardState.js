import { useState } from 'react';

const useBoardState = () => {
  const [selectedSquare, setSelectedSquare] = useState(null);
  const [selectedPiece, setSelectedPiece] = useState(null);
  const [pieces, setPieces] = useState([
    { type: 'P', position: '6,0' },
    { type: 'P', position: '6,1' },
    { type: 'P', position: '6,2' },
    { type: 'P', position: '6,3' },
    { type: 'P', position: '6,4' },
    { type: 'P', position: '6,5' },
    { type: 'P', position: '6,6' },
    { type: 'P', position: '6,7' },
    { type: 'p', position: '1,0' },
    { type: 'p', position: '1,1' },
    { type: 'p', position: '1,2' },
    { type: 'p', position: '1,3' },
    { type: 'p', position: '1,4' },
    { type: 'p', position: '1,5' },
    { type: 'p', position: '1,6' },
    { type: 'p', position: '1,7' },
    { type: 'R', position: '7,0' },
    { type: 'N', position: '7,1' },
    { type: 'B', position: '7,2' },
    { type: 'Q', position: '7,3' },
    { type: 'K', position: '7,4' },
    { type: 'B', position: '7,5' },
    { type: 'N', position: '7,6' },
    { type: 'R', position: '7,7' },
    { type: 'r', position: '0,0' },
    { type: 'n', position: '0,1' },
    { type: 'b', position: '0,2' },
    { type: 'q', position: '0,3' },
    { type: 'k', position: '0,4' },
    { type: 'b', position: '0,5' },
    { type: 'n', position: '0,6' },
    { type: 'r', position: '0,7' },
  ]);

  const onSquareClick = (squareKey, piece) => {
    if (!selectedPiece) {
      setSelectedPiece(piece);
      setSelectedSquare(squareKey);
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
    }
    };
};

export default useBoardState;
