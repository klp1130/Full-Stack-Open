import React from 'react'

const CountryHeader = (country, expand, setExpand) => {
    const toggleExpand = () => {
        setExpand(!expand)
    }

    const buttonText = expand ? 'Close Record' : 'Open Record'

  return (
    <>
    <li key={country.name.common}>
        <h3>{country.name.common}</h3>
        <button onClick={toggleExpand}>{buttonText}</button>
    </li>
    </>
  )
}

export default CountryHeader