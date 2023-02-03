import React from 'react';

const BoardSquare = ({ color, squareKey, onClick, piece }) => {
  return (
    <div
      style={{
        width: '50px',
        height: '50px',
        backgroundColor: color,
        display: 'inline-block',
        position: 'relative'
      }}
      onClick={onClick}
    >
      {piece ? (
        <div
          style={{
            position: 'absolute',
            top: '0',
            left: '0',
            width: '100%',
            height: '100%',
            textAlign: 'center',
            lineHeight: '50px',
            color: 'red'
          }}
        >
          {piece.type}
        </div>
      ) : null}
    </div>
  );
};

export default BoardSquare;
