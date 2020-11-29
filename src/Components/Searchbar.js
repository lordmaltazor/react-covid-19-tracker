import React from 'react'
import './Searchbar.css';

function Searchbar({submitForm, updateSearch}) {
    console.log(`${submitForm}, ${updateSearch}`);
    
    return (
        <form className="search-form" onSubmit={submitForm}>
            <input className="search-bar" type="text" placeholder="Search by country" onChange={updateSearch}/>
            <button className="search-button">Search</button>
        </form>
    );
}

export default Searchbar