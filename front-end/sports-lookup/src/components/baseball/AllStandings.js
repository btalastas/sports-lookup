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

import { calculatePercentage } from "../../utils/standingsUtils.js";

/**
 * Component to view the standings for all MLB teams.
 *
 * @param {Object} param0 MLB standings object from aws api.
 * @returns Standings for all teams.
 */
export default function AllStandings({ standings }) {
  return (
    <TableContainer
      key={standings}
      component={Paper}
      style={{ marginBottom: "20 px" }}
    >
      <Typography varient="h6" style={{ padding: "16px" }}>
        MLB Standings
      </Typography>
      <Table aria-label="MLB Standings">
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
          {standings.map((team) => (
            <TableRow key={team.team_id}>
              <TableCell component="th" scope="row">
                {team.sport_rank}
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
}
