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
 * Component to view the standings for MLB divisions.
 *
 * @param {Object} param0 MLB standings object from aws api.
 * @returns Standings for all divisions.
 */
export default function DivisionStandings({ standings }) {
  return (
    <div>
      {Object.keys(standings).map((division) => {
        const teams = standings[division];
        if (!teams || !Array.isArray(teams)) {
          console.error(`Missing data for division: ${division}`);
          return null; // Prevents rendering and execution if data is incomplete
        }
        return (
          <TableContainer
            key={division}
            component={Paper}
            style={{ marginBottom: "20px" }}
          >
            <Typography variant="h6" style={{ padding: "16px" }}>
              {division}
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
                {teams.map((team) => (
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
