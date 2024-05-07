import { useEffect, useRef, useState } from "react";
import HeaderNav from "./header-nav.jsx";
import { Container } from "@mui/material";
import fetch from "node-fetch";


function App() {

  const [res, setRes] = useState([]);
  const hasFetchedData = useRef(false);
  // const hasFetchedStandings = useRef(false);

  const url =
    "https://yl4lgoitba.execute-api.us-east-1.amazonaws.com/prod/mlb_schedule";

  // const standingsURL =
  //   "https://yl4lgoitba.execute-api.us-east-1.amazonaws.com/prod/mlb_standings";

  const fetchData = (() => {
      fetch(url)
      .then((response) => response.json()) // Parsing the JSON response
      .then((data) => setRes(data))
      .catch((error) => console.error("Error fetching data:", error));
  })
  useEffect(() => {

    if (hasFetchedData.current === false) {
      fetchData();
      hasFetchedData.current = true;
    } 
  }, []);


  // const fetchStandings = (() => {
  //   fetch(standingsURL, {
  //     mode: "cors",
  //     method: "GET",
  //     headers: { "Content-Type": "application/json" },
  //   })
  //     .then((response) => response.json()) // Parsing the JSON response
  //     .then((data) => console.log(data))
  //     .catch((error) => console.error("Error fetching data:", error));
  // })

  


  return (
    <Container sx={{ height: "100vh" }}>
      <Container sx={{padding: 0, width: "300vh"}}>
        {/* <HeaderNav res={res}/> */}
      </Container>
    </Container>
  );
}

export default App;
