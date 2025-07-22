
import React, { useState, useEffect } from "react";

const AutoScore = () => {
  const [runs, setRuns] = useState(0);
  const [wickets, setWickets] = useState(0);
  const [balls, setBalls] = useState(0);
  const [overs, setOvers] = useState(0);
  const [matchEnded, setMatchEnded] = useState(false);

  const totalOvers = 5; 

  useEffect(() => {
    if (matchEnded) return;

    const interval = setInterval(() => {
      simulateBall();
    }, 1000); 

    return () => clearInterval(interval);
  }, [balls, matchEnded]);

  const simulateBall = () => {
    const random = Math.floor(Math.random() * 7); 

    if (random === 6 && wickets < 10) {
      setWickets((prev) => prev + 1);
    } else {
      setRuns((prev) => prev + random);
    }

    setBalls((prev) => {
      const newBalls = prev + 1;
      if (newBalls >= totalOvers * 6 || wickets >= 10) {
        setMatchEnded(true);
      }
      return newBalls;
    });

    setOvers((prev) => Math.floor((balls + 1) / 6));
  };

  return (
    <div className="container">
      <h2>Live Match Simulation</h2>
      <p>Overs: {overs}.{balls % 6}</p>
      <p>Runs: {runs}</p>
      <p>Wickets: {wickets}</p>
      {matchEnded && <h3>Innings Ended</h3>}
    </div>
  );
};

export default AutoScore;
