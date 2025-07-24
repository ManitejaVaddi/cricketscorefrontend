import React, { useEffect, useState } from "react";
import { getMatches } from "../services/api";

const MatchList = () => {
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    const fetchMatches = async () => {
      const res = await getMatches();
      setMatches(res);
    };
    fetchMatches();
  }, []);

  return (
    <div>
      <h2>All Matches</h2>
      <ul>
        {matches.map((match) => (
          <li key={match._id}>
            {match.teamA} vs {match.teamB} — Toss: {match.tossWinner} — Score: {match.runs}/{match.wickets} ({match.overs} overs) — Winner: {match.winner}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MatchList;
