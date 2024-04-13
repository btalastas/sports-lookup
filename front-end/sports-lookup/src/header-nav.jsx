import { AppBar, Grid, Typography } from "@mui/material";
import SportsBaseballIcon from "@mui/icons-material/SportsBaseball";

export default function HeaderNav() {
  return (
    <AppBar
      position="fixed"
      sx={{ backgroundColor: "red", boxShadow: 0, marginTop: 3, height: "6vh" }}
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
            color: "black",
            alignSelf: "center",
          }}
        />
        <Typography sx={{ color: "black" }}>hello</Typography>
      </Grid>
    </AppBar>
  );
}
