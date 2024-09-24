import { Link } from "react-router-dom";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";

const NavBar = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          LegalEASE
        </Typography>
        <Button color="inherit" component={Link} to="/wikipedia-history">
        Wikipedia Search
        </Button>
        <Button color="inherit" component={Link} to="/users">
          Users
        </Button>
        <Button color="inherit" component={Link} to="/search-history">
          Search History
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
