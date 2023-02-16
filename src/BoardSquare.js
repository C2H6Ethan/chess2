import React from 'react';

const BoardSquare = ({ color, squareKey, onClick, piece, legalMove }) => {
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
      {legalMove && (
        <div
          style={{
            position: 'absolute',
            top: '25px',
            left: '25px',
            width: '0',
            height: '0',
            borderRadius: '50%',
            border: '2px solid #333',
            boxShadow: '0 0 8px 2px #333',
            zIndex: 10
          }}
        />
      )}
      {piece ? (
        <img
          style={{
            position: 'absolute',
            top: '0',
            left: '0',
            width: '100%',
            height: '100%',
            zIndex: 5
          }}
          src={require(`./images/${piece.color}${piece.type}.png`)}
          alt={`${piece.color} ${piece.type}`}
        />
      ) : null}
    </div>
  );
};

export default BoardSquare;
