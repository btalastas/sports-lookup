import React, { useEffect, useState } from "react";
import {
  Typography,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
  CircularProgress,
} from "@mui/material";

import fetchSchedule from "../utils/fetch_schedule.js";
import extractPitchers from "../utils/extractPitcherNames.js";

const url =
  "https://yl4lgoitba.execute-api.us-east-1.amazonaws.com/prod/mlb_schedule";

export default function Schedule() {
  const [games, setGames] = useState([]);
  const [pitchers, setPitchers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadSchedule = async () => {
      const scheduleData = await fetchSchedule(url);
      setGames(scheduleData);
      setLoading(false);
      setPitchers(extractPitchers(games));
    };

    loadSchedule();
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

  return (
    <Card raised style={{ margin: "20px", backgroundColor: "#fafafa" }}>
      <CardContent>
        <Typography variant="h4" gutterBottom>
          MLB Game Schedule
        </Typography>
        {games.length > 0 ? (
          <List>
            {games.map((game, index) => (
              <ListItem key={index} divider>
                <ListItemText
                  primary={`${game.away_name} @ ${game.home_name}`}
                  secondary={`${game.away_probable_pitcher} vs ${game.home_probable_pitcher}`}
                />
              </ListItem>
            ))}
          </List>
        ) : (
          <Typography variant="subtitle1">No games scheduled.</Typography>
        )}
      </CardContent>
    </Card>
  );
}
