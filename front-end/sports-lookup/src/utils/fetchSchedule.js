import fetch from "node-fetch";

/**
 * Fetches aws api for sports games for the current day.
 *
 * @param {String} url AWS API url.
 * @returns {Object} JSON of mlb games for current day.
 */
const fetchSchedule = async (url) => {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return { error: `Failed to fetch data` };
  }
};

export default fetchSchedule;
