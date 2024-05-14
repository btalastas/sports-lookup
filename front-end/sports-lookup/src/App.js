import { useEffect, useRef, useState } from "react";
import HeaderNav from "./header-nav.jsx";
import { Container, CircularProgress } from "@mui/material";

import fetchSchedule from "./utils/fetch_schedule.js";
import fetchStandings from "./utils/fetch_standings.js";
import Schedule from "./components/Schedule.js";
import Standings from "./components/Standings.js";

function App() {
  // MLB Schedule
  const [games, setGames] = useState([]);

  // MLB Standings
  const [standings, setStandings] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const scheduleData = fetchSchedule(
      process.env.REACT_APP_MLB_SCHEDULE_API_URL
    );

    const standingsData = fetchStandings(
      process.env.REACT_APP_MLB_STANDINGS_API_URL
    );

    Promise.all([scheduleData, standingsData])
      .then(([response1, response2]) => {
        setGames(response1);
        setStandings(response2);
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
    // <Schedule games={games} />
    <Standings standings={standings} />
    // <Container sx={{ height: "100vh" }}>

    //   <Container sx={{ padding: 0, width: "300vh" }}>
    //     {/* <HeaderNav res={res}/> */}
    //   </Container>
    // </Container>
  );
}

export default App;
