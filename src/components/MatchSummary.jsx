import React, { useEffect, useState } from "react";
import axios from "axios";
import "./MatchSummary.css";

const MatchSummary = () => {
  const [summaries, setSummaries] = useState([]);

  useEffect(() => {
    const fetchSummaries = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/matches/summaries");
        setSummaries(res.data);
      } catch (err) {
        console.error("Failed to fetch match summaries:", err);
      }
    };

    fetchSummaries();
  }, []);

  return (
    <div className="match-summary-container">
      <h2>🏏 Match Summaries</h2>
      {summaries.length === 0 ? (
        <p>No summaries available.</p>
      ) : (
        summaries.map((match, idx) => (
          <div className="match-summary-card" key={idx}>
            <h3>
              {match.teamA} vs {match.teamB}
            </h3>
            <p><strong>Date:</strong> {new Date(match.date).toLocaleDateString()}</p>
            <p><strong>Location:</strong> {match.location || "N/A"}</p>
            <p><strong>Toss Winner:</strong> {match.tossWinner}</p>
            <p><strong>Toss Decision:</strong> {match.tossDecision}</p>
            <p><strong>{match.teamA} Score:</strong> {match.scoreA} ({match.oversA} overs)</p>
            <p><strong>{match.teamB} Score:</strong> {match.scoreB} ({match.oversB} overs)</p>
            <p><strong>🏆 Winner:</strong> {match.winner}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default MatchSummary;
