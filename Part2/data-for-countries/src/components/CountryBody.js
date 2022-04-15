import React from 'react'
import Weather from './Weather'

const CountryBody = ({country}) => {

    const languages = country.languages
    const listLanguages = () => {
        for (const language in languages) {
            return <li>{languages[language]}</li>
        }
    }

  return (
    <div>
        <p>Capital: {country.capital}</p>
        <p>Area: {country.area}</p>
        <p>Languages include:</p>  
        <ul>{listLanguages()}</ul>
        <img src={country.flag.png} alt='Country Flag' width="200" />
        <br></br>
        <img src= {country.coatOfArms.png} alt="Country coat of arms" width="100" />
    </div>
  )
}

export default CountryBody