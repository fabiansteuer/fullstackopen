import { useState } from "react";

function getRandomInt(min, max) {
  // Minimum is inclusive and maximum is exclusive
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
}

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
  ];

  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0));
  const maxVotes = Math.max(...votes);

  const upvoteAnecdote = () => {
    const newVotes = [...votes];
    newVotes[selected] += 1;
    setVotes(newVotes);
  };

  const selectAnecdote = () => {
    setSelected(getRandomInt(0, anecdotes.length));
  };

  return (
    <>
      <h1>Anecdotes</h1>
      <h2>Anecdote of the Day</h2>
      <p>{anecdotes[selected]}</p>
      <p>has {votes[selected]} votes</p>
      <button onClick={upvoteAnecdote}>Vote</button>
      <button onClick={selectAnecdote}>Next</button>
      <h2>Anecdote With Most Votes</h2>
      <p>{anecdotes[votes.indexOf(maxVotes)]}</p>
      <p>has {maxVotes} votes</p>
    </>
  );
};

export default App;
