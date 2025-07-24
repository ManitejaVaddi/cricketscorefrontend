
import React from "react";

const ScoreForm = ({ onUpdateScore }) => {
  const handleBall = (type) => {
    onUpdateScore(type);
  };

  const ballTypes = ["0", "1", "2", "3", "4", "6", "W", "Wd", "Nb"];

  return (
    <div>
      <h2>Update Score</h2>
      <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
        {ballTypes.map((type) => (
          <button key={type} onClick={() => handleBall(type)}>
            {type}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ScoreForm;
