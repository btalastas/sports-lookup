import {
  Typography,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";

import { getDate } from "../../utils/getDate.js";

export default function BasketballSchedule({ games }) {
  return (
    <Card raised style={{ margin: "20px", backgroundColor: "#fafafa" }}>
      <CardContent>
        <Typography variant="h4" gutterBottom align="center">
          {`NBA Game Schedule for ${getDate()}`}
        </Typography>
        {games.length > 0 ? (
          <List>
            {games.map((game, index) => {
              <ListItem key={index} divider>
                <ListItemText
                  align="center"
                  primary={
                    <>
                      {`${game.awayTeam.teamCity} ${game.awayTeam.teamName} @ ${game.homeTeam.teamCity} ${game.hometeam.teamName}`}
                      <br />
                      {`${game.gameStatusText}`}
                    </>
                  }
                ></ListItemText>
              </ListItem>;
            })}
          </List>
        ) : (
          <Typography varient="subtitle1" align="center">
            No games scheduled.
          </Typography>
        )}
      </CardContent>
    </Card>
  );
}
