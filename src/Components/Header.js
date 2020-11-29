import React from 'react';
import './Header.css';

function Header({query}) {
    return (
        <h1 className="header">Covid-19 Cases, deaths and recoveries {query === '' ? `World-Wide` : `in ${query}`}</h1>
    );
}

export default Header;