import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useNavigate,
} from "react-router-dom";

import Navbar from "./components/Navbar.jsx";
import Home from "./components/Home.jsx";
import Register from "./components/Register.jsx";
import Login from "./components/Login.jsx";
import MatchForm from "./components/MatchForm.jsx";
import TossForm from "./components/TossForm.jsx";
import ScoreBoard from "./components/ScoreBoard.jsx";
import WinnerForm from "./components/WinnerForm.jsx";
import MatchSummary from "./components/MatchSummary.jsx";

const AppWrapper = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [match, setMatch] = useState(null);
  const [toss, setToss] = useState(null);
  const [winnerData, setWinnerData] = useState(null);

  const handleLogin = (userData) => {
    setUser(userData);
    navigate("/");
  };

  const handleLogout = () => {
    setUser(null);
    setMatch(null);
    setToss(null);
    setWinnerData(null);
    navigate("/login");
  };

  return (
    <>
      <Navbar user={user} onLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<Home user={user} />} />

        <Route
          path="/register"
          element={user ? <Navigate to="/" replace /> : <Register />}
        />

        <Route
          path="/login"
          element={
            user ? <Navigate to="/" replace /> : <Login onLogin={handleLogin} />
          }
        />

        <Route
          path="/match"
          element={
            user ? (
              <MatchForm
                onMatchCreate={(data) => {
                  setMatch(data);
                  navigate("/toss");
                }}
              />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        <Route
          path="/toss"
          element={
            user && match ? (
              <TossForm
                teams={[match?.teamA, match?.teamB]}
                onTossResult={(data) => {
                  setToss(data);
                  navigate("/scoreboard");
                }}
              />
            ) : (
              <Navigate to="/match" replace />
            )
          }
        />

        <Route
          path="/scoreboard"
          element={
            user && match && toss ? (
              <ScoreBoard
                match={match}
                toss={toss}
                onEndMatch={(resultData) => {
                  setWinnerData(resultData);
                  navigate("/winner");
                }}
              />
            ) : (
              <Navigate to="/toss" replace />
            )
          }
        />

        <Route
          path="/winner"
          element={
            user && winnerData ? (
              <WinnerForm
                teamA={winnerData.teamA}
                teamB={winnerData.teamB}
                scoreA={winnerData.scoreA}
                scoreB={winnerData.scoreB}
                result={winnerData.result}
              />
            ) : (
              <Navigate to="/scoreboard" replace />
            )
          }
        />

        <Route
          path="/summaries"
          element={user ? <MatchSummary /> : <Navigate to="/login" replace />}
        />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
};

const App = () => (
  <Router>
    <AppWrapper />
  </Router>
);

export default App;
