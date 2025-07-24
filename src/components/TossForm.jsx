import React, { useState } from "react";
import "./TossForm.css";

const TossForm = ({ teams, onTossResult }) => {
  const [tossWinner, setTossWinner] = useState("");
  const [decision, setDecision] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onTossResult({ tossWinner, decision });
  };

  return (
    <div className="toss-form-container">
      <h2>Toss</h2>
      <form onSubmit={handleSubmit}>
        <select value={tossWinner} onChange={(e) => setTossWinner(e.target.value)} required>
          <option value="">Select Toss Winner</option>
          {teams.map((team, idx) => (
            <option key={idx} value={team}>{team}</option>
          ))}
        </select>
        <select value={decision} onChange={(e) => setDecision(e.target.value)} required>
          <option value="">Decision</option>
          <option value="bat">Bat</option>
          <option value="bowl">Bowl</option>
        </select>
        <button type="submit">Submit Toss</button>
      </form>
    </div>
  );
};

export default TossForm;
