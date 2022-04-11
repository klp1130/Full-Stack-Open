import { useState } from 'react'

//  give feed back
//good | Neutral | bad
//  statistics
// good value
// neutral value
// bad value
//const Display

const Button = ({handleClick, text}) => (
  <button onClick={handleClick}>
    {text}
    </button>
)

const Statistics = ({good, neutral, bad}) => (
  <div>
    <table>
      <tbody>
    <StatisticsLine text = 'good: ' value = {good} />
    <StatisticsLine text = 'neutral: ' value = {neutral} />
    <StatisticsLine text = 'bad: ' value = {bad} />
    <StatisticsLine text = 'all: ' value = {good+neutral+bad} />
    <StatisticsLine text = 'average:' value = {(good + neutral + bad) === 0 ? 0 : (good - bad) / (good+neutral+bad)} />
    <StatisticsLine text = 'positive:' value = {(good + neutral + bad) === 0 ? 0 : 100 * (good) / (good+neutral+bad) + '%'} />
      </tbody>
    </table>
  </div>
)
const StatisticsLine = ({text, value}) => (
    
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
)

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGoodClick = () => {
    setGood(good +1)
  }
  const handleNeutralClick = () => {
    setNeutral(neutral +1)
  } 
  const handleBadClick = () => {
    setBad(bad +1)
  }

  if((good + neutral + bad) === 0) {
    return (
      <div>
      <h1>Give Feedback</h1>
      <Button handleClick={handleGoodClick} text='Good' />
      <Button handleClick={handleNeutralClick} text='Neutral' />
      <Button handleClick={handleBadClick} text='Bad' />
      <br></br>
      <h2>No Feedback Given</h2>
      </div>
    )
  }

  return (
    <div>
      <h1>Give Feedback</h1>
      <Button handleClick={handleGoodClick} text='Good' />
      <Button handleClick={handleNeutralClick} text='Neutral' />
      <Button handleClick={handleBadClick} text='Bad' />
      <h1>Statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}


export default App