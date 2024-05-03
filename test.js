import fetch from "node-fetch";

// Define your API Gateway invoke URL
const url =
  "https://yl4lgoitba.execute-api.us-east-1.amazonaws.com/prod/mlb_schedule";

fetch(url)
  .then((response) => response.json()) // Parsing the JSON response
  .then((data) => console.log(data))
  .catch((error) => console.error("Error fetching data:", error));
