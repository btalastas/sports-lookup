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

export const calculatePercentage = (wins, losses) => {
  return ((wins / (wins + losses)) * 100).toFixed(1);
};
