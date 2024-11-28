import { useEffect, useRef, useState, Component } from "react";
import HeaderNav from "./header-nav.jsx";
import { Card, CardActionArea, Grid, Typography, CircularProgress  } from "@mui/material";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import fetchSchedule from "./utils/fetchSchedule.js";
import fetchStandings from "./utils/fetchStandings.js";
import BaseballSchedule from "./components/baseball/BaseballSchedule.js";
import BaseballStandings from "./components/baseball/BaseballStandings.js";
import Home from "./components/home.js";

import BasketballSchedule from "./components/basketball/BasketballSchedule.js";
import { Link, Outlet } from "react-router-dom";

function App() {
  // NBA Schedule
  const [nbaGames, setNbaGames] = useState([]);

  // MLB Schedule
  const [mlbGames, setMlbGames] = useState([]);

  // MLB Standings
  const [mlbStandings, setMlbStandings] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const mlbScheduleData = fetchSchedule(
      process.env.REACT_APP_MLB_SCHEDULE_API_URL
    );

    const mlbStandingsData = fetchStandings(
      process.env.REACT_APP_MLB_STANDINGS_API_URL
    );

    const nbaScheduleData = fetchStandings(
      process.env.REACT_APP_NBA_SCHEDULE_API_URL
    );

    Promise.all([mlbScheduleData, mlbStandingsData, nbaScheduleData])
      .then(([response1, response2, response3]) => {
        setMlbGames(response1);
        setMlbStandings(response2);
        setNbaGames(response3);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Failed to fetch data:", error);
        setError("Failed to fetch data");
      });
  }, []);

  if (loading) {
    return (
      <div
        style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}
      >
        <CircularProgress />
      </div>
    );
  }

  if (error) {
    return <p>Error: {error}</p>;
  }
  
        
            
    
  

  return (
    <BrowserRouter> 
      <Routes>
        <Route path="/" element={<Home />} /> 
        <Route path="/basketball" element={<BasketballSchedule games={nbaGames.scoreboard.games} />} /> 
        <Route path="/baseball" element={<BaseballStandings standings={mlbStandings} />} />
      </Routes>
    </BrowserRouter>
    // <BaseballSchedule games={mlbGames} />
    // <BasketballSchedule games={nbaGames.scoreboard.games} />
    // <Standings standings={standings} />
    // <Container sx={{ height: "100vh" }}>

    //   <Container sx={{ padding: 0, width: "300vh" }}>
    //     {/* <HeaderNav res={res}/> */}
    //   </Container>
    // </Container>
  );
}

export default App;
