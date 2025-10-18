import { useState } from 'react'

const Header = (props) => <h1>{props.text}</h1>

const Button = (props) => (
  <button onClick={props.onClick}>
    {props.text}
  </button>
)

const Statline = ({ text, value }) => (
  <tr>
    <td>
      {text}
    </td>
    <th>
      {value}
    </th>
  </tr>
)

const Stats = ({ good, neutral, bad }) => {
  const all = good + neutral + bad
  const average = all / 3
  let positive = (good / all) * 100
  positive = `${positive}%`
  if (all === 0) {
    return (
      <div>
        No feedback given
      </div>
    )
  }
  return (
    <>
      <table>
        <tbody>
          <Statline text="good" value={good} />
          <Statline text="neutral" value={neutral} />
          <Statline text="bad" value={bad} />
          <Statline text="all" value={all} />
          <Statline text="average" value={average} />
          <Statline text="positive" value={positive} />
        </tbody>
      </table>
    </>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const setToGood = (newvValue) => setGood(newvValue)
  const setToNeutral = (newvValue) => setNeutral(newvValue)
  const setToBad = (newvValue) => setBad(newvValue)

  return (
    <div>
      <Header text="give feedback" />
      <Button onClick={() => setToGood(good + 1)} text="good" />
      <Button onClick={() => setToNeutral(neutral + 1)} text="neutral" />
      <Button onClick={() => setToBad(bad + 1)} text="bad" />
      <Header text="statistics" />
      <Stats good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App