/**
 * Function to create an object that ranks MLB teams by their league.
 * National, and American.
 *
 * @param {Object} standings MLB standings object from aws api.
 * @returns {Object} For each MLB league and their teams ranked.
 */
export const createLeagueStandings = (standings) => {
  const league = { national: [], american: [] };

  Object.keys(standings).forEach((divisionId) => {
    if (standings[divisionId].div_name.includes("National")) {
      standings[divisionId].teams.forEach((team) => {
        league.national.push(team);
      });
    } else if (standings[divisionId].div_name.includes("American")) {
      standings[divisionId].teams.forEach((team) => {
        league.american.push(team);
      });
    }
  });
  return league;
};

/**
 * Function to create a list to rank all MLB teams.
 *
 * @param {Object} standings MLB standings object from aws api.
 * @returns {List} All MLB teams sorted by their rank.
 */
export const createAllStandings = (standings) => {
  let sportsStandings = [];

  Object.values(standings).forEach((division) => {
    sportsStandings = sportsStandings.concat(division.teams);
  });

  sportsStandings.sort(
    (a, b) => parseInt(a.sport_rank) - parseInt(b.sport_rank)
  );
  return sportsStandings;
};

/**
 * Function to create an object for each division.
 * AL West, AL East, AL Central, NL West, NL East, and NL Central.
 *
 * @param {Object} standings MLB standings object from aws api.
 * @returns {Object} For each division with their teams ranked.
 */
export const createDivisionStandings = (standings) => {
  let divisionStandings = {};

  Object.values(standings).forEach((division) => {
    divisionStandings[division.div_name] = division.teams;
  });
  return divisionStandings;
};

/**
 *
 * @param {int} wins how many wins a team has.
 * @param {int} losses how many losses a team has.
 * @returns {float} winning percentage of a given team.
 */
export const calculatePercentage = (wins, losses) => {
  return ((wins / (wins + losses)) * 100).toFixed(1);
};
