import React, {useEffect, useState} from 'react';
import './App.css';
import Card from './Card';
import Header from './Header';

function App() {  
  const [cases, setCases] = useState(0);
  const [deaths, setDeaths] = useState(0);
  const [recovered, setRecovered] = useState(0);

  const [search, setSearch] = useState('');
  const [query, setQuery] = useState('');

  const [errorMessage, setErrorMessage] = useState('empty'); 

  useEffect(() => {
    fetchData();
  }, []) 

  useEffect(() => {
    fetchData();
  }, [query])

  const fetchData = async () => { 
    //console.log("Query: " + query);
    
    const requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };
    
    const response = await fetch("https://api.covid19api.com/summary", requestOptions);
    const data = await response.json();

    // If the seach is empty then we search world wide, if the user has typed in a country we fetch data from that country
    if (query === '') {      

      //console.log(data);

      setCases(commafy(data.Global.TotalConfirmed));
      setDeaths(commafy(data.Global.TotalDeaths));
      setRecovered(commafy(data.Global.TotalRecovered));

      setErrorMessage('empty');
    }
    else {
      //console.log(data);

      let foundCountry = false;

      //console.log("Number of countries: " + data.Countries.length);

      for (let i = 0; i < data.Countries.length; i++)
      {
        if (query.toLocaleLowerCase() === data.Countries[i].Country.toLowerCase())
        {
          setCases(commafy(data.Countries[i].TotalConfirmed));
          setDeaths(commafy(data.Countries[i].TotalDeaths));
          setRecovered(commafy(data.Countries[i].TotalRecovered));

          foundCountry = true;

          setErrorMessage('empty');

          return;
        }
      }

      if (foundCountry === false)
      {
        setErrorMessage(`Sorry, didn't find a country with name '${query}'`);
      }
    }
  }

  function commafy(number) {
    let string = number.toString().split('.');

    if (string[0].length >= 5) {
        string[0] = string[0].replace(/(\d)(?=(\d{3})+$)/g, '$1,');
    }

    if (string[1] && string[1].length >= 5) {
        string[1] = string[1].replace(/(\d{3})/g, '$1 ');
    }
    return string.join(".");
  }

  function titleCase(string) {
    let splitStr = string.toLowerCase().split(' ');

    for (let i = 0; i < splitStr.length; i++) {
        splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);     
    }

    return splitStr.join(' '); 
  }

  const updateSearch = e => {
    setSearch(e.target.value);
  }

  const submitForm = e => { 
    e.preventDefault();

    setQuery(search);

    fetchData();

    e.target.reset();

    e.target.focus(); 
  }

  return (
    <div className="app">
      <Header text={titleCase(query)}/>

      <form className="search-form" onSubmit={submitForm}>
        <input className="search-bar" type="text" placeholder="Search by country" onChange={updateSearch}/>
        <button className="search-button">Search</button>
      </form>

      <p className="error-message" style={errorMessage === 'empty' ? {visibility:"hidden"} : {visibility:"visible"}}>{errorMessage}</p> 

      <div className="cards">
        <Card title={`Cases: >${cases}`}/>
        <Card title={`Deaths: ${deaths}`}/>
        <Card title={`Recovered: ${recovered}`}/>
      </div>

      <footer>Made by <a href="https://twitter.com/lordmaltazor" target="_blank">@lordmaltazor </a> | Data is fetched from <a href="https://github.com/CSSEGISandData/COVID-19" target="_blank">Johns Hopkins CSSE</a> using <a href="https://covid19api.com/" target="_blank">covid19api.com</a></footer>      
    </div>
  );
}

export default App;
