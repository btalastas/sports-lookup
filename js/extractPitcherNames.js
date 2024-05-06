/**
 *
 * @param {Object} schedule mlb Schedule for current day.
 * @returns {Array} list of objects for home and away pitchers.
 */
const extractPitchers = (schedule) => {
  let pitchers = [];
  schedule.map((games) => {
    let currentPitchers = {
      home: games["home_probable_pitcher"],
      away: games["away_probable_pitcher"],
    };
    pitchers.push(currentPitchers);
  });
  return pitchers;
};

export default extractPitchers;
