import fetch from "node-fetch";

const url =
  "https://yl4lgoitba.execute-api.us-east-1.amazonaws.com/prod/mlb_standings";

/**
 *
 * @param {String} url AWS API url
 * @returns {Object} object for standings for each division
 */
const fetchStandings = async (url) => {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data.body;
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
};

const standings = await fetchStandings(url);
// console.log(standings);

Object.keys(standings).forEach((division) => {
  console.log(`division = ${division.div_name}`);
});

export default fetchStandings;
