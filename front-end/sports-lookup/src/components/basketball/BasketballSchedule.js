import React from "react";
import {
  Card,
  CardContent,
  Typography,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";

import { getDate } from "../../utils/getDate.js";

export default function BasketballSchedule({ games }) {
  let nba_games = {};
  console.log(games);
  // Handle potential parsing errors
  try {
    if (typeof games !== "object" || games === null) {
      throw new Error("games is not an object");
    }
  } catch (error) {
    console.error("Error parsing games data:", error);
    return (
      <Card raised style={{ margin: "20px", backgroundColor: "#fafafa" }}>
        <CardContent>
          <Typography variant="h4" gutterBottom align="center">
            NBA Game Schedule
          </Typography>
          <Typography variant="subtitle1" align="center">
            Error parsing game data.
          </Typography>
        </CardContent>
      </Card>
    );
  }

  // Fallback in case there are no games
  if (!games || games === 0) {
    return (
      <Card raised style={{ margin: "20px", backgroundColor: "#fafafa" }}>
        <CardContent>
          <Typography variant="h4" gutterBottom align="center">
            {`NBA Game Schedule for ${getDate()}`}
          </Typography>
          <Typography variant="subtitle1" align="center">
            No games scheduled.
          </Typography>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card raised style={{ margin: "20px", backgroundColor: "#fafafa" }}>
      <CardContent>
        <Typography variant="h4" gutterBottom align="center">
          {`NBA Game Schedule for ${getDate()}`}
        </Typography>
        <List>
          {games.map((game, index) => (
            <ListItem key={index} divider>
              <ListItemText
                align="center"
                primary={
                  <>
                    {`${game.awayTeam.teamCity} ${game.awayTeam.teamName} (${game.awayTeam.wins}-${game.awayTeam.losses}) @ ${game.homeTeam.teamCity} ${game.homeTeam.teamName} (${game.homeTeam.wins}-${game.homeTeam.losses})`}
                    <br />
                    {`${game.gameStatusText}`}
                  </>
                }
              />
            </ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  );
}
