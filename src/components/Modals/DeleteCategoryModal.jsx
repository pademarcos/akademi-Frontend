import React from "react";
import {
    Typography,
    Button,
    IconButton,
    Box,
  } from "@mui/material";

  const DeleteCategoryModal = ({handleDeleteCategory, handleCloseDeleteModal, categories, DeleteIcon}) => {
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
        Delete Category
      </Typography>
      <Typography variant="body2" color="text.secondary">
        Are you sure you want to delete the following categories?
      </Typography>
      <ul>
        {categories.map((cat) => (
          <li key={cat._id}>
            {cat.name}
            <IconButton
              color="secondary"
              onClick={() => handleDeleteCategory(cat._id)}
            >
              <DeleteIcon />
            </IconButton>
          </li>
        ))}
      </ul>
      <Button variant="contained" color="primary" onClick={handleCloseDeleteModal}>
        Cancel
      </Button>
    </Box>
  )
}
  export default DeleteCategoryModal