import { useState } from "react";
import { Container, Tab, Tabs, Box, Typography } from "@mui/material";

import {
  createAllStandings,
  createDivisionStandings,
  createLeagueStandings,
} from "../../utils/standingsUtils.js";

import DivisionStandings from "./DivisionStandings.js";
import LeagueStandings from "./LeagueStandings.js";
import AllStandings from "./AllStandings.js";

/**
 * MLB standings component. Can change to division, league, or all standings.
 *
 * @param {Object} param0 MLB standings object from aws api.
 * @returns Table for the given standings
 */
export default function Standings({ standings }) {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Container>
      <Box>
        <Tabs value={value} onChange={handleChange} centered>
          <Tab label="Division Standings"></Tab>
          <Tab label="League Standings"></Tab>
          <Tab label="All Standings"></Tab>
        </Tabs>
        <TabPanel value={value} index={0}>
          <DivisionStandings standings={createDivisionStandings(standings)} />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <LeagueStandings standings={createLeagueStandings(standings)} />
        </TabPanel>
        <TabPanel value={value} index={2}>
          <AllStandings standings={createAllStandings(standings)} />
        </TabPanel>
      </Box>
    </Container>
  );
}

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography component="div">{children}</Typography>
        </Box>
      )}
    </div>
  );
}
