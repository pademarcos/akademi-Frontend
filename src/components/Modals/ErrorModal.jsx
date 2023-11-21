import React from "react";
import {
    Typography,
    Button,
    Box,
  } from "@mui/material";

const ErrorModal = ({handleCloseErrorModal}) => {
    return (
    <Box
      sx={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: 400,
        bgcolor: "background.paper",
        boxShadow: 24,
        p: 4,
      }}
    >
      <Typography variant="h6" component="h2">
        Error
      </Typography>
      <Typography variant="body2" color="text.secondary">
        There was an error processing your request.
      </Typography>
      <Button variant="contained" color="primary" onClick={handleCloseErrorModal}>
        OK
      </Button>
    </Box>
  );
}
  export default ErrorModal