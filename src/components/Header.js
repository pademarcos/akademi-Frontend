import React from "react";
import { Fragment } from "react";
import { AppBar, Toolbar, Typography, Box } from "@mui/material";

const Header = (props) => {
  return (
    <Fragment>
      <AppBar position="static">
        <Toolbar>
          <Box
            sx={{
              flexGrow: 1,
              backgroundImage:
                "linear-gradient(135deg, #97ABFF 10%, #123597 100%)",
              padding: "10px",
            }}
          >
            <Typography variant="h4" component="div" color="inherit">
              Techtrend
            </Typography>
            <Typography variant="subtitle1" color="inherit">
              Explore the Latest in Personal Technology
            </Typography>
          </Box>
        </Toolbar>
      </AppBar>
    </Fragment>
  );
};

export default Header;