import { useState } from 'react'

import Button from './components/Button'
import Display from './components/Display'

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

      <h1>Statistics</h1>
      <Display text={"good"} value={good}/>
      <Display text={"neutral"} value={neutral}/>
      <Display text={"bad"} value={bad}/>

      <Display text={"all"} value={all}/>
      <Display text={"average"} value={average/all}/>
      <Display text={"positive"} value={(good/all)*100}/>
    </div>
  )
}

export default App