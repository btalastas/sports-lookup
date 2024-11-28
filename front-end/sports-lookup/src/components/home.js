import React from "react";
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import basketball from '../assets/basketball.png';
import baseball from '../assets/baseball.png';


export default function Home() {
  return (
    <Grid container spacing={2}>
      <Grid xs={12}>
        <Typography style={{ margin: 10, textAlign: "center", fontSize: 40 }}>
          Maniac Sports
        </Typography>
      </Grid>
      <Grid item xs={6}>
        <CardActionArea>
          <Link to="/basketball">
            <Card sx={{ minHeight: 500, textAlign: "center" }}>
              <CardContent>
                <Typography fontSize={50}>Basketball</Typography>
                <img src={basketball} alt='' height={200} style={{marginTop: 100}}/>
              </CardContent>
            </Card>
          </Link>
        </CardActionArea>
      </Grid>
      <Grid item xs={6}>
        <CardActionArea>
          <Link to="/baseball">
            <Card sx={{ minHeight: 500, textAlign: "center" }}>
              <CardContent>
                <Typography fontSize={50}>Baseball</Typography>
                <img src={baseball} alt='' height={200} style={{marginTop: 100}}/>
              </CardContent>
            </Card>
          </Link>
        </CardActionArea>
      </Grid>
    </Grid>
  );
}
