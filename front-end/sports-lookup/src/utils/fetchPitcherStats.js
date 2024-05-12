import fetch from "node-fetch";

const url =
  "https://yl4lgoitba.execute-api.us-east-1.amazonaws.com/prod/pitching_stats";

/**
 *
 * @param {String} url AWS API url for fetching pitcher stats.
 * @param {String} name pitcher name.
 * @returns Object for pitcher stats.
 */
const fetchPitcherStats = async (url, name) => {
  try {
    const api_url = `${url}?fullName=${name}`;
    const response = await fetch(api_url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
};

// const name = "Casey Mize";

// const pitcher = await fetchPitcherStats(url, name);

// console.log(pitcher);

export default fetchPitcherStats;
