import React from 'react'
import { useState } from 'react'

const Button = (props) => {
  return (
    <button
      onClick={props.onClick}
    >
      {props.text}
    </button>
  )
}

const Statistic = (props) => {
  return (
    <p>{props.name} {props.statistic}</p>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h2>give feedback</h2>
      <Button
        onClick={() => setGood(good + 1)}
        text="good"
      />
      <Button
        onClick={() => setNeutral(neutral + 1)}
        text="neutral"
      />
      <Button
        onClick={() => setBad(bad + 1)}
        text="bad"
      />
      <h2>statistics</h2>
      <Statistic
        name="good"
        statistic={good}
      />
      <Statistic
        name="neutral"
        statistic={neutral}
      />
      <Statistic
        name="bad"
        statistic={bad}
      />
    </div>
  )
}

export default App