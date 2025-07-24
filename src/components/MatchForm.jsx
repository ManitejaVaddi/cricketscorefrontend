import React, { useState } from "react";
import "./MatchForm.css";

const MatchForm = ({ onMatchCreate }) => {
  const [formData, setFormData] = useState({
    teamA: "",
    teamB: "",
    overs: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.teamA || !formData.teamB || !formData.overs) {
      alert("Please fill in all fields");
      return;
    }

    onMatchCreate(formData); 
  };

  return (
    <div className= "match-form-container">
      <h2>Create Match</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="teamA"
          placeholder="Team A"
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="teamB"
          placeholder="Team B"
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="overs"
          placeholder="Overs"
          onChange={handleChange}
          required
        />
        <button type="submit">Create</button>
      </form>
    </div>
  );
};

export default MatchForm;
