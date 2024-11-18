import { useEffect, useRef, useState } from "react";
import HeaderNav from "./header-nav.jsx";
import { Container, CircularProgress } from "@mui/material";

import fetchSchedule from "./utils/fetchSchedule.js";
import fetchStandings from "./utils/fetchStandings.js";
import BaseballSchedule from "./components/Schedule.js";
import Standings from "./components/Standings.js";

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

    Promise.all([mlbScheduleData, mlbStandingsData])
      .then(([response1, response2]) => {
        setMlbGames(response1);
        setMlbStandings(response2);
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
    <BaseballSchedule games={mlbGames} />
    // <Standings standings={standings} />
    // <Container sx={{ height: "100vh" }}>

    //   <Container sx={{ padding: 0, width: "300vh" }}>
    //     {/* <HeaderNav res={res}/> */}
    //   </Container>
    // </Container>
  );
}

export default App;
