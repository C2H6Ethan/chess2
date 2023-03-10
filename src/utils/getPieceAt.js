export const getPieceAt = (position, pieces) => {
  return pieces.find((piece) => piece.position === position);
};
