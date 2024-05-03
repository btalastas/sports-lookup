import fetch from "node-fetch";

// Define your API Gateway invoke URL
// const url =
//   "https://yl4lgoitba.execute-api.us-east-1.amazonaws.com/prod/mlb_schedule";

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
    return null; // or handle the error as needed
  }
};

export default fetchSchedule;
