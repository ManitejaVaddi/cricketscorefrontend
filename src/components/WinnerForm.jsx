import React from "react";
import './WinnerForm.css'; 

const WinnerForm = ({ teamA, teamB, scoreA, scoreB, result }) => {
  return (
    <div className="winner-container">
      <h2>Match Result</h2>
      <p>{teamA}: {scoreA} runs</p>
      <p>{teamB}: {scoreB} runs</p>
      <h3> Winner: {result}</h3>
    </div>
  );
};

export default WinnerForm;
