import React from "react";
import { Fragment } from "react";
import { Typography, Container, Link, Box } from "@mui/material";

const Footer = () => {
  return (
    <Fragment>
      <Box
        component="footer"
        sx={{
          py: 3,
          backgroundColor: "#212121", 
          color: "#ffffff",
          width: "100%", 
          
          bottom: 0,
        }}
      >
        <Container maxWidth="md">
          <Typography variant="body2" align="center">
            Techtrend - Discover the Latest in Personal Technology
          </Typography>
          <Typography variant="body2" align="center">
            Contact Us: info@techtrend.com
          </Typography>
          <Typography variant="body2" align="center">
            Follow us on{" "}
            <Link href="#" color="inherit">
              Twitter
            </Link>{" "}
            and{" "}
            <Link href="#" color="inherit">
              Instagram
            </Link>
          </Typography>
        </Container>
      </Box>
    </Fragment>
  );
};

export default Footer;
