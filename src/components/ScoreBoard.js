import React, { useState, useEffect } from "react";
import "./ScoreBoard.css";

const ScoreBoard = ({ match, toss, onEndMatch }) => {
  const [balls, setBalls] = useState(0);
  const [runs, setRuns] = useState(0);
  const [wickets, setWickets] = useState(0);
  const [currentInning, setCurrentInning] = useState(1);
  const [firstInningScore, setFirstInningScore] = useState(null);
  const [inningOver, setInningOver] = useState(false);
  const [matchResult, setMatchResult] = useState("");
  const [recentBalls, setRecentBalls] = useState([]);
  const [matchSummary, setMatchSummary] = useState(null);

  const totalOvers = parseInt(match?.overs) || 2;
  const totalBalls = totalOvers * 6;

  const battingTeam =
    currentInning === 1
      ? toss?.choice === "bat"
        ? toss.winner
        : toss.winner === match.teamA
        ? match.teamB
        : match.teamA
      : firstInningScore?.battingTeam === match.teamA
      ? match.teamB
      : match.teamA;

  const bowlingTeam = battingTeam === match.teamA ? match.teamB : match.teamA;

  const updateHistory = (value) => {
    setRecentBalls((prev) => [value, ...prev.slice(0, 5)]);
  };

  const handleOutcome = (value) => {
    if (inningOver) return;

    if (value === "w") {
      setWickets((prev) => prev + 1);
      updateHistory("W");
    } else if (value === "WD" || value === "NB") {
      setRuns((prev) => prev + 1);
      updateHistory(value);
    } else {
      setRuns((prev) => prev + parseInt(value));
      setBalls((prev) => prev + 1);
      updateHistory(value);
    }
  };

  useEffect(() => {
    const updatedBalls = balls;
    const updatedWickets = wickets;
    const updatedRuns = runs;

    if (currentInning === 1 && (updatedBalls >= totalBalls || updatedWickets >= 10)) {
      setFirstInningScore({ runs: updatedRuns, battingTeam });
      setInningOver(true);
      updateHistory("Inning Over");
    }

    if (currentInning === 2) {
      if (
        updatedRuns > firstInningScore?.runs ||
        updatedBalls >= totalBalls ||
        updatedWickets >= 10
      ) {
        let result = "";

        if (updatedRuns > firstInningScore.runs) {
          result = `${battingTeam} won the match`;
        } else if (updatedRuns < firstInningScore.runs) {
          result = `${bowlingTeam} won the match`;
        } else {
          result = "Match Draw";
        }

        const summary = {
          teamA: match.teamA,
          teamB: match.teamB,
          overs: match.overs,
          scoreA: firstInningScore.runs,
          scoreB: updatedRuns,
          result,
        };

        setMatchSummary(summary);
        setMatchResult(result);
        setInningOver(true);
        updateHistory("Inning Over");

        if (typeof onEndMatch === "function") {
          onEndMatch(summary);
        }

        
        fetch("http://localhost:5000/api/matches/summary", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(summary),
        }).catch((err) => {
          console.error("Failed to save match summary:", err);
        });
      }
    }
  }, [balls, runs, wickets]);

  const startSecondInning = () => {
    setBalls(0);
    setRuns(0);
    setWickets(0);
    setInningOver(false);
    setCurrentInning(2);
    setRecentBalls([]);
  };

  return (
    <div className="scoreboard-container">
      <h2>
        {match.teamA} vs {match.teamB}, Inning {currentInning}
      </h2>

      {currentInning === 2 && firstInningScore && (
        <h3>Target: {firstInningScore.runs + 1} runs</h3>
      )}

      <p>
        {battingTeam}: {runs}/{wickets} ({Math.floor(balls / 6)}.{balls % 6} ov)
      </p>
      <p>CRR: {(runs / (balls / 6 || 1)).toFixed(2)}</p>

      {inningOver && currentInning === 1 && (
        <button className="scoreboard-button" onClick={startSecondInning}>
          Start 2nd Inning
        </button>
      )}

      {!inningOver && (
        <>
          <h3>Select Outcome</h3>
          <div className="outcome-buttons">
            {["0", "1", "2", "3", "4", "6", "WD", "NB", "w"].map((val) => (
              <button key={val} onClick={() => handleOutcome(val)}>
                {val}
              </button>
            ))}
          </div>
        </>
      )}

      <div className="recent-balls">
        <h4>Recent Balls</h4>
        <div>
          {recentBalls.map((val, idx) => (
            <span key={idx}>{val} </span>
          ))}
        </div>
      </div>

      {matchResult && <h2>{matchResult}</h2>}

      {matchSummary && (
        <div className="match-summary">
          <h3>Match Summary</h3>
          <p>
            <strong>{matchSummary.teamA}:</strong> {matchSummary.scoreA} runs
          </p>
          <p>
            <strong>{matchSummary.teamB}:</strong> {matchSummary.scoreB} runs
          </p>
          <p>
            <strong>Overs:</strong> {matchSummary.overs}
          </p>
          <p>
            <strong>Result:</strong> {matchSummary.result}
          </p>
        </div>
      )}
    </div>
  );
};

export default ScoreBoard;
