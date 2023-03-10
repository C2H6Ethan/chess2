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
