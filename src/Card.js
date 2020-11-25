import React from 'react';

function Card({title}) {
    return (
        <div className="card">
            <h1 className="title">{title}</h1>
        </div>       
    );
}

export default Card;