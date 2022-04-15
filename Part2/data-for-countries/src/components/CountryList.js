import Country from './Country'
import CountryBody from './CountryBody'

// this component displays seach results based on number of items in the result


const CountryList = ({filteredCountries}) => {

 let expandObject = {}
    filteredCountries.forEach((country) => {
      expandObject[country.name.common] = false
    })

    //return list of filtered countries!!
const filteredResults = filteredCountries.map((country) => {
    return <Country key={country.name.common} country={country} expandObject={expandObject}/>
    })

const result = () => {
    if (filteredResults.length === 0) {
        return "Start your Search"
    }   else if (filteredCountries.length === 1) {
        return (<div><h2>{filteredCountries[0].name.common}</h2><CountryBody country={filteredCountries[0]} /></div>)
    }   else if (filteredCountries.length > 10) {
        return "Your search returned too many results. Narrow your search and try again" 
    }   else {
        return <ul>{filteredResults}</ul>
    }  

} 
return <div>{result()}</div>
}

export default CountryList