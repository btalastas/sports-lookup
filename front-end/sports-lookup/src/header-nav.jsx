import { useEffect, useRef, useState } from "react";
import { AppBar, Divider, Grid, Typography } from "@mui/material";
import SportsBaseballIcon from "@mui/icons-material/SportsBaseball";

function HeaderNav(props) {
  let tempNum = 0;

  const date = new Date(props.res[0]?.game_date);
  const formattedDate = `${date.getMonth() + 1}/${date.getUTCDate()}`;
  // console.log(props.res)

  for (let i = 0; i < props.res.length; i++) {
    // console.log(props.res[i].status);
    if (props.res[i].status === "In Progress") {
      // i++
      tempNum++;
    }
    console.log(tempNum);
  }

  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: "white",
        borderStyle: "solid",
        borderColor: "#00ffff",
        height: "6vh",
        marginTop: 3,
      }}
    >
      <Grid
        sx={{ height: "100%" }}
        container
        justifyContent="row"
        alignItems="center"
      >
        <SportsBaseballIcon
          sx={{
            display: { xs: "none", md: "flex" },
            mr: 1,
            color: "blue",
            alignSelf: "center",
            fontSize: 38,
          }}
        />
        <Typography sx={{ color: "black", fontWeight: "bold", fontSize: 32 }}>
          {formattedDate}
        </Typography>
        <Divider
          orientation="vertical"
          sx={{ marginLeft: 2, backgroundColor: "#00ffff" }}
        />
        {props.res.map((i) => {
          if (i.status === "In Progress")
            return (
              <>
                {" "}
                <Typography color={"black"}>{i.away_name}</Typography>{" "}
                <Divider
                  orientation="vertical"
                  sx={{ marginLeft: 2, backgroundColor: "#00ffff" }}
                />{" "}
              </>
            );
        })}
      </Grid>
    </AppBar>
  );
}

export default HeaderNav;
