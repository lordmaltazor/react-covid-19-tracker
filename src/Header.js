import React from 'react';

function Header({text}) {
    if (text == '')
    {
        return (
            <h1 className="header">Covid-19 Cases, deaths and recoveries World-Wide</h1>
        );
    }
    else
    {
        return (
            <h1 className="header">Covid-19 Cases, deaths and recoveries in {text}</h1>
        );
    }
}

export default Header;