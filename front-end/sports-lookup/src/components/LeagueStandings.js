import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
} from "@mui/material";

import { calculatePercentage } from "../utils/standingsUtils.js";

/**
 * Component to view the standings for MLB leagues.
 * American and National League.
 *
 * @param {Object} standings MLB standings object from aws api.
 * @returns Standings for each league.
 */
export default function LeagueStandings({ standings }) {
  return (
    <div>
      {Object.keys(standings).map((league) => {
        const teams = standings[league];
        if (!teams || !Array.isArray(teams)) {
          console.error(`Missing data for league: ${league}`);
          return null;
        }
        return (
          <TableContainer
            key={league}
            component={Paper}
            style={{ marginBottom: "20px" }}
          >
            <Typography variant="h6" style={{ padding: "16px" }}>
              {league}
            </Typography>
            <Table aria-label="league standings">
              <TableHead>
                <TableRow>
                  <TableCell>Rank</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell align="right">W</TableCell>
                  <TableCell align="right">L</TableCell>
                  <TableCell align="right">Win %</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {teams.map((team) => (
                  <TableRow key={team.team_id}>
                    <TableCell component="th" scope="row">
                      {team.league_rank}
                    </TableCell>
                    <TableCell>{team.name}</TableCell>
                    <TableCell align="right">{team.w}</TableCell>
                    <TableCell align="right">{team.l}</TableCell>
                    <TableCell align="right">
                      {calculatePercentage(team.w, team.l)}%
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        );
      })}
    </div>
  );
}
