import React from "react";
import {
    Typography,
    Button,
    Select,
    MenuItem,
    FormControl,
    TextField,
    Box,
    InputLabel,
  } from "@mui/material";

const CreateProductModal = ({newProductData, setNewProductData, categories, handleCreateProduct}) => {
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
        Create New Product
      </Typography>
      <TextField
        label="Product Name"
        fullWidth
        margin="normal"
        variant="outlined"
        value={newProductData.name}
        onChange={(e) => setNewProductData({ ...newProductData, name: e.target.value })}
      />
      <TextField
        label="Price"
        fullWidth
        margin="normal"
        variant="outlined"
        type="number"
        value={newProductData.price}
        onChange={(e) => setNewProductData({ ...newProductData, price: e.target.value })}
      />
      <TextField
        label="Brand"
        fullWidth
        margin="normal"
        variant="outlined"
        value={newProductData.brand}
        onChange={(e) => setNewProductData({ ...newProductData, brand: e.target.value })}
      />
      <TextField
        label="Description"
        fullWidth
        margin="normal"
        variant="outlined"
        multiline
        rows={4}
        value={newProductData.description}
        onChange={(e) => setNewProductData({ ...newProductData, description: e.target.value })}
      />
      <FormControl fullWidth margin="normal" variant="outlined">
        <InputLabel id="category-select-label">Category</InputLabel>
        <Select
          label="Category"
          value={newProductData.category_id}
          onChange={(e) => setNewProductData({ ...newProductData, category_id: e.target.value })}
        >
          {categories.map((cat) => (
            <MenuItem key={cat._id} value={cat._id}>
              {cat.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Button variant="contained" color="primary" onClick={handleCreateProduct}>
        Create
      </Button>
    </Box>
  )
}

export default CreateProductModal