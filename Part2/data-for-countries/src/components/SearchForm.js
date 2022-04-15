import React from 'react'



const SearchForm = ({countries, searchWord, setFilteredCountries, setSearchWord}) => {
 
    // access data contained in the form
    const handleFilter = (event) => {
        const useFilter = event.target.value
        setSearchWord(useFilter)
    }   
    
    const applyFilter = (event) => {
        event.preventDefault()
        const theFilter = countries.filter((countryObj) => {
            return countryObj.name.common.toLowerCase().includes(searchWord.toLowerCase())
        })
        setFilteredCountries(theFilter)
        setSearchWord('')
    }

    return (
        <>
        <form onSubmit={applyFilter}>
            <input
                type='text'
                value={searchWord}
                onChange={handleFilter} />
            </form>
        </>
    )
}

export default SearchForm