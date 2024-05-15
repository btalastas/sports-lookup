import fetch from "node-fetch";

/**
 * Fetches aws api for given MLB Pitcher
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

export default fetchPitcherStats;
