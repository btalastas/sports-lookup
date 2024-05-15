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

import {
  calculatePercentage,
  createAllStandings,
  createDivisionStandings,
  createLeagueStandings,
} from "../utils/standingsUtils.js";

/**
 * MLB standings component. Can change to division, league, or all standings.
 *
 * @param {Object} param0 MLB standings object from aws api.
 * @returns Table for the given standings
 */
export default function Standings({ standings }) {
  return (
    <div>
      {Object.entries(standings).map(([divisionId, division]) => {
        // Ensure 'division' and 'division.teams' are valid before mapping over it
        if (!division || !division.teams) {
          console.error(`Missing division data for divisionId: ${divisionId}`);
          return null; // Prevents rendering and execution if data is incomplete
        }

        return (
          <TableContainer
            key={divisionId}
            component={Paper}
            style={{ marginBottom: "20px" }}
          >
            <Typography variant="h6" style={{ padding: "16px" }}>
              {division.div_name}
            </Typography>
            <Table aria-label="division standings">
              <TableHead>
                <TableRow>
                  <TableCell>Rank</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell align="right">W</TableCell>
                  <TableCell align="right">L</TableCell>
                  <TableCell align="right">GB</TableCell>
                  <TableCell align="right">Win %</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {division.teams.map((team) => (
                  <TableRow key={team.team_id}>
                    <TableCell component="th" scope="row">
                      {team.div_rank}
                    </TableCell>
                    <TableCell>{team.name}</TableCell>
                    <TableCell align="right">{team.w}</TableCell>
                    <TableCell align="right">{team.l}</TableCell>
                    <TableCell align="right">{team.gb}</TableCell>
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
