export const simulateMove = (from, to, pieces) => {
  // create a copy of the pieces array
  const newPieces = pieces.slice();

  // find the piece being moved and update its position
  const pieceIndex = newPieces.findIndex((p) => p.position === from);
  newPieces[pieceIndex] = { ...newPieces[pieceIndex], position: to };

  return newPieces;
};
