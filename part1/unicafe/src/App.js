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

const StatisticLine = (props) => {
  return (
    <p>{props.text} {props.value}</p>
  )
}

const Statistics = (props) => {
  const {good, neutral, bad, all, average, positive} = props
  if(!good) {
    return <p>No feedback given</p>
  }
  return (
    <div>
      <StatisticLine text="good" value={good}/>
      <StatisticLine text="neutral" value={neutral}/>
      <StatisticLine text="bad" value={bad}/>
      <StatisticLine text="all" value={all}/>
      <StatisticLine text="average" value={average}/>
      <StatisticLine text="positive" value={positive}/>
    </div>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  let all = good + neutral + bad
  let average = (good - bad) / (good + bad + neutral)
  let positive = good / (good + neutral + bad) * 100

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
      <Statistics 
        good={good}
        neutral={neutral}
        bad={bad}
        all={all}
        average={average}
        positive={positive}
      />
    </div>
  )
}

export default App