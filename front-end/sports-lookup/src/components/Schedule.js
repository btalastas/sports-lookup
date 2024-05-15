import {
  Typography,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";

import { getDate } from "../utils/getDate.js";

/**
 * MLB schedule component that lists the current games, pitchers, and pitcher stats.
 *
 * @param {Object} param0 MLB schedule object from aws api.
 * @returns A list of scheduled MLB games for the current date.
 */
export default function Schedule({ games }) {
  return (
    <Card raised style={{ margin: "20px", backgroundColor: "#fafafa" }}>
      <CardContent>
        <Typography variant="h4" gutterBottom align="center">
          {`MLB Game Schedule for ${getDate()}`}
        </Typography>
        {games.length > 0 ? (
          <List>
            {games.map((game, index) => (
              <ListItem key={index} divider>
                <ListItemText
                  align="center"
                  primary={
                    <>
                      {`${game.away_name} @ ${game.home_name}`}
                      <br />
                      {`${game.game_date} | ${game.venue_name}`}
                      <br />
                      {game.doubleheader === "Y"
                        ? `Doubleheader game: ${game.game_num}`
                        : null}
                    </>
                  }
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
