import React from 'react';
import useBoardState from './useBoardState';

const TestPawnMoves = () => {
  const { getPawnMoves, getPieceAt } = useBoardState();

  const testPawn = { type: 'P', color: 'white', position: '1,5' };
  const pawnMoves = getPawnMoves(testPawn, testPawn.position);
  console.log(pawnMoves);

  return <div>Check the console for the results of the test</div>;
};

export default TestPawnMoves;
