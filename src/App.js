import React, {useEffect, useState} from 'react';
import './Components/App.css';
import Header from './Components/Header';
import Searchbar from './Components/Searchbar';
import Card from './Components/Card';
import Footer from './Components/Footer';

function App() {  
  const [cases, setCases] = useState(0);
  const [deaths, setDeaths] = useState(0);
  const [recovered, setRecovered] = useState(0);

  const [search, setSearch] = useState('');
  const [query, setQuery] = useState('');

  const [errorMessage, setErrorMessage] = useState(''); 

  useEffect(() => {
    fetchData('');
  }, []) 
  
  const fetchData = async (searchQuery) =>
  {
    const requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };

    const response = await fetch("https://api.covid19api.com/summary", requestOptions);
    const data = await response.json();
      
    if (searchQuery === '') 
    {      
      //console.log(data);

      setCases(commafy(data.Global.TotalConfirmed));
      setDeaths(commafy(data.Global.TotalDeaths));
      setRecovered(commafy(data.Global.TotalRecovered));

      setErrorMessage("");
    }
    else 
    {
      //console.log(data);

      let foundCountry = false;

      //console.log("Number of countries: " + data.Countries.length);

      for (let i = 0; i < data.Countries.length; i++)
      {
        if (searchQuery.toLocaleLowerCase() === data.Countries[i].Country.toLowerCase())
        {
          setCases(commafy(data.Countries[i].TotalConfirmed));
          setDeaths(commafy(data.Countries[i].TotalDeaths));
          setRecovered(commafy(data.Countries[i].TotalRecovered));

          foundCountry = true;

          setErrorMessage("");
        }
      }

      if (foundCountry === false)
      {
        setErrorMessage(`Sorry, didn't find a country with name '${searchQuery}'`);
      }

      wasFetchSuccessful(foundCountry == true && response != null);
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

    fetchData(search);

    e.target.reset();
  }

  function wasFetchSuccessful (bool)
  {
    if (bool === true)
    { 
      setQuery(search);
    }
  }

  return (
    <div className="app">
      <div className="page">
        <Header query={titleCase(query)}/>

        <Searchbar submitForm={submitForm} updateSearch={updateSearch}/>

        <p className="error-message">{errorMessage}</p> 

        <div className="cards">
          <Card title={'Cases: '} amount={cases}/>
          <Card title={'Deaths: '} amount={deaths}/>
          <Card title={'Recoveries: '} amount={recovered}/>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default App;
