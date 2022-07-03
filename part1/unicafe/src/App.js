import { useState } from "react";

const Button = ({ label, onClick }) => {
  return <button onClick={onClick}>{label}</button>;
};

const StatisticLine = ({ value, text, unit }) => {
  return (
    <tr>
      <td>
        {value}
        {unit}
      </td>
      <td>{text}</td>
    </tr>
  );
};

const Statistics = ({ good, neutral, bad }) => {
  if (!good & !neutral & !bad) return <p>No feedback yet.</p>;

  return (
    <table>
      <tbody>
        <StatisticLine value={good} text="good" />
        <StatisticLine value={neutral} text="neutral" />
        <StatisticLine value={bad} text="bad" />
        <StatisticLine value={good + neutral + bad} text="total" />
        <StatisticLine
          value={
            Math.round(((good - bad) / (good + neutral + bad)) * 100) / 100
          }
          text="average"
        />
        <StatisticLine
          value={Math.round((good / (good + neutral + bad)) * 1000) / 10}
          text="positive"
          unit="%"
        />
      </tbody>
    </table>
  );
};

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const increaseGood = () => {
    setGood(good + 1);
  };

  const increaseNeutral = () => {
    setNeutral(neutral + 1);
  };

  const increaseBad = () => {
    setBad(bad + 1);
  };

  return (
    <>
      <h1>UniCafe</h1>
      <h2>Give Feedback</h2>
      <Button label="Good" onClick={increaseGood} />
      <Button label="Neutral" onClick={increaseNeutral} />
      <Button label="Bad" onClick={increaseBad} />
      <h2>Statistics</h2>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </>
  );
};

export default App;
