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

const Statistics = (props) => {
  const {good, neutral, bad, all, average, positive} = props

  return (
    <div>
      <h2>statistics</h2>
      <p>good {good}</p>
      <p>neutral {neutral}</p>
      <p>bad {bad}</p>
      <p>all {all}</p>
      <p>average {!average ? 0 : average}</p>
      <p>positive {!positive ? 0 : positive}</p>
    </div>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const all = good + neutral + bad
  const average = (good - bad) / (good + bad + neutral)
  const positive = good / (good + neutral + bad) * 100

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
      <Statistics 
        good={good}
        neutral={neutral}
        bad={bad}
        all={all}
        average={average}
        positive={positive}
      />
      {/* <h2>statistics</h2>
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
      <Statistic
        name="all"
        statistic={all}
      />
      <Statistic
        name="average"
        statistic={!average ? 0 : average}
      />
      <Statistic
        name="positive"
        statistic={!positive ? 0 : `${positive}%`}
      /> */}
    </div>
  )
}

export default App