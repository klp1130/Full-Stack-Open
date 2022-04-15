import {useState} from 'react'
import CountryHeader from './CountryHeader'
import CountryBody from './CountryBody'


const Country = ({country, expandObject}) => {
    const [expand, setExpand] = useState(expandObject[country.name.common])

   /* const toggleExpand = () => {
        setExpand(!expand)
    }*/

    const fullRecord = (
        <div>
            <CountryHeader 
            expand={expand}
            setExpand={setExpand}
            country={country}
            />
            <CountryBody country={country} />
        </div>
    )

    const partialRecord = (
        <div>
            <CountryHeader 
            expand={expand}
            setExpand={setExpand}
            country={country}
            /> {' '}
        </div>
    )

    const displayRecord = expand ? fullRecord : partialRecord


  return displayRecord
    
  
}

export default Country