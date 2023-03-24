import "./styles.css";
import { useDispatch } from "react-redux";
import { setLogout } from "../../state";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

const NavBar = () => {
  const dispatch = useDispatch();
  return (
    <Box sx={{ /* flexGrow: 1,  */ position: "sticky", top: 0 }}>
      <AppBar position="static" style={{ backgroundColor: "lightskyblue" }}>
        <Toolbar className="center">
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/createworkout"
            sx={{
              mr: 2,
              display: "flex",
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".1rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            CREATE WORKOUT
          </Typography>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/workouts"
            sx={{
              m: 2,
              display: "flex",
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".1rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            WORKOUTS
          </Typography>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/records"
            sx={{
              m: 2,
              display: "flex",
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".1rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            RECORDS
          </Typography>
          <Typography
            onClick={() => dispatch(setLogout())}
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              display: "flex",
              fontFamily: "monospace",
              fontWeight: 700,
              color: "inherit",
              textDecoration: "none",
            }}
          >
            Log out
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default NavBar;
