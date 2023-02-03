import React from 'react';

const BoardSquare = ({ color, squareKey, onClick, piece }) => {
    return (
        <div
        style={{
            width: '50px',
            height: '50px',
            backgroundColor: color,
            display: 'inline-block',
            color: 'red',
            textAlign: 'center',
            lineHeight: '50px'
        }}
        onClick={onClick}
        >
        {piece ? piece.type : null}
        </div>
    );
};

export default BoardSquare;