
import React, {useState, useEffect} from 'react'
import axios from 'axios'
import CountryList from './components/CountryList'
import SearchForm from './components/SearchForm'

const App = () => {
  //list of countries
  const [countries, setCountries] = useState([])
  // country to be found
  const [searchWord, setSearchWord] = useState('')
  // country filter
  const [filteredCountries, setFilteredCountries] = useState([])


  useEffect(() => {
    console.log('effect')
    axios 
    .get('https://restcountries.com/v3.1/all')
    .then(response => {
      const countries = response.data
      setCountries(countries)
    })
  }, [])
  console.log('render', setCountries.length, 'name');


  return (
    <div>
      <h2>Country Search Application</h2>
      
      <h3>Search</h3>
      
      <SearchForm 
      searchWord={searchWord}
      setSearchWord={setSearchWord}
      countries={countries}
      setFilteredCountries={setFilteredCountries}

      />
    
    <h3>Results</h3>
    <CountryList filteredCountries={filteredCountries} />
    </div>

 )
}

export default App