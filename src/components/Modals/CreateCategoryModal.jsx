import React from 'react'
import {
    Typography,
    Button,
    TextField,
    Box,
  } from "@mui/material";

const CreateCategoryModal = ({ newCategoryName, setNewCategoryName, handleCreateCategory}) => {
    return(
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
        Create New Category
      </Typography>
      <TextField
        label="Category Name"
        fullWidth
        margin="normal"
        variant="outlined"
        value={newCategoryName}
        onChange={(e) => setNewCategoryName(e.target.value)}
        // error={newCategoryName.length < 3}
        // helperText={newCategoryName.length < 3 ? 'La longitud debe ser al menos 3 caracteres' : ''}
      />
      <Button variant="contained" color="primary" onClick={handleCreateCategory}>
        Create
      </Button>
    </Box>
    )
}

export default CreateCategoryModal