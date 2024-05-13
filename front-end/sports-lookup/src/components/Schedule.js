import {
  Typography,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";

export default function Schedule({ games }) {
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
