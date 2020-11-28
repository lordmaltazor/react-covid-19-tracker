import React from 'react';
import './Card.css';

function Card({title, amount}) {
    return (
        <div className="card">
            <div className="container">
                <h1 className="title">{title}</h1>
                <h2 className="amount">{amount}</h2>
            </div>
        </div>       
    );
}

export default Card;