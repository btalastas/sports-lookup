import {useEffect, useState} from 'react';
import logo from './logo.svg';
import './App.css';
import HeaderNav from './header-nav';
import { Container, Typography } from '@mui/material';
import data from './Data.json';

function App() {
  
  const fetchUrl = "https://yl4lgoitba.execute-api.us-east-1.amazonaws.com/prod/mlb_schedule"

  let displayData
  
  function pullJson(){
    fetch(fetchUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        // Add any additional headers if needed
        // 'Access-Control-Allow-Origin': '*' // This header might help, but it's usually set on the server side
      }
    })
    .then(res => res.json())
    .then(resData => {
      displayData = resData.map(function(baseball){
        return(
        <p></p>
        )
      })
      console.log(resData)
    })
  }

  useEffect(() => {
    pullJson()
  },[])

  return (
    <Container sx={{height: "100vh"}}>
        <Container width={false} disableGutters sx={{marginTop: 5, height: '6vh'}}>
          <HeaderNav />
        </Container>
        <Typography></Typography>
    </Container>  
  );
}

export default App;
