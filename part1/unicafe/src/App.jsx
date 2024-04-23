import { useState } from 'react'

import Button from './components/Button'
import Statistics from './components/Statistics'

const App = () => {
  // guarda los clics de cada botón en su propio estado
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const [all, setAll] = useState(0)
  const [average, setAverage] = useState(0)

  const goodOnclick = () =>{
    setGood(good+1)
    setAll(all+1)
    setAverage(average+1)
  }

  const neutralOnclick = () =>{
    setNeutral(neutral+1)
    setAll(all+1)
  }

  const badOnclick = () =>{
    setBad(bad+1)
    setAll(all+1)
    setAverage(average-1)
  }

  return (
    <div>
      <h1>Give feedback!</h1>
      <Button text={"good"} handle={goodOnclick} />
      <Button text={"neutral"} handle={neutralOnclick} />
      <Button text={"bad"} handle={badOnclick}/>

      <Statistics good={good} neutral={neutral} bad={bad} all={all} average={average} />
    </div>
  )
}

// it's not the prettiest solution but it works

export default App