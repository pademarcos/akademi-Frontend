import React from "react";
import {
    Typography,
    Button,
    Box,
  } from "@mui/material";

const DeleteConfirmationModal = ({handleDeleteProduct, productIdToDelete, handleCloseDeleteProductModal})  => {
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
        Delete Product
      </Typography>
      <Typography variant="body2" color="text.secondary">
        Are you sure you want to delete this product?
      </Typography>
      <Button variant="contained" color="primary" onClick={() => handleDeleteProduct(productIdToDelete)}>
        Delete
      </Button>
      <Button variant="outlined" color="secondary" onClick={handleCloseDeleteProductModal}>
        Cancel
      </Button>
    </Box>
  )
}

  export default DeleteConfirmationModal