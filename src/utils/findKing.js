export const findKing = (pieces, color) => {
  const king = pieces.find(
    (piece) => piece.color === color && piece.type === "k"
  );
  return king.position;
};
