import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
  useHistory,
} from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Register from "./components/Register";
import Login from "./components/Login";
import MatchForm from "./components/MatchForm";
import TossForm from "./components/TossForm";
import ScoreBoard from "./components/ScoreBoard";
import WinnerForm from "./components/WinnerForm";
import MatchSummary from "./components/MatchSummary";

const AppWrapper = () => {
  const history = useHistory();
  const [user, setUser] = useState(null);
  const [match, setMatch] = useState(null);
  const [toss, setToss] = useState(null);
  const [winnerData, setWinnerData] = useState(null);

  const handleLogin = (userData) => {
    setUser(userData);
    history.push("/");
  };

  const handleLogout = () => {
    setUser(null);
    setMatch(null);
    setToss(null);
    setWinnerData(null);
    history.push("/login");
  };

  return (
    <>
      <Navbar user={user} onLogout={handleLogout} />
      <Switch>
        <Route exact path="/">
          <Home user={user} />
        </Route>

        <Route path="/register">
          {user ? <Redirect to="/" /> : <Register />}
        </Route>

        <Route path="/login">
          {user ? <Redirect to="/" /> : <Login onLogin={handleLogin} />}
        </Route>

        <Route path="/match">
          {user ? (
            <MatchForm
              onMatchCreate={(data) => {
                setMatch(data);
                history.push("/toss");
              }}
            />
          ) : (
            <Redirect to="/login" />
          )}
        </Route>

        <Route path="/toss">
          {user && match ? (
            <TossForm
              teams={[match?.teamA, match?.teamB]}
              onTossResult={(data) => {
                setToss(data);
                history.push("/scoreboard");
              }}
            />
          ) : (
            <Redirect to="/match" />
          )}
        </Route>

        <Route path="/scoreboard">
          {user && match && toss ? (
            <ScoreBoard
              match={match}
              toss={toss}
              onEndMatch={(resultData) => {
                setWinnerData(resultData);
                history.push("/winner");
              }}
            />
          ) : (
            <Redirect to="/toss" />
          )}
        </Route>

        <Route path="/winner">
          {user && winnerData ? (
            <WinnerForm
              teamA={winnerData.teamA}
              teamB={winnerData.teamB}
              scoreA={winnerData.scoreA}
              scoreB={winnerData.scoreB}
              result={winnerData.result}
            />
          ) : (
            <Redirect to="/scoreboard" />
          )}
        </Route>

        {/* Match Summaries Route */}
        <Route path="/summaries">
          {user ? <MatchSummary /> : <Redirect to="/login" />}
        </Route>

        <Redirect to="/" />
      </Switch>
    </>
  );
};

const App = () => (
  <Router>
    <AppWrapper />
  </Router>
);

export default App;
