import React, { useState } from "react";
import {
  Typography,
  Container,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  IconButton,
  Snackbar,
} from "@mui/material";
import { AddShoppingCart as AddShoppingCartIcon } from "@mui/icons-material";

const Products = ({ addToCart }) => {
  const [category, setCategory] = useState("all");
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  const handleAddToCart = () => {
    // Implementa la lógica para agregar productos al carrito aquí
    setOpenSnackbar(true);
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  const products = [
    { id: 1, name: "Product A", category: "Electronics", price: 20 },
    { id: 2, name: "Product B", category: "Clothing", price: 10 },
    { id: 3, name: "Product C", category: "Accessories", price: 30 },
    { id: 4, name: "Product D", category: "Accessories", price: 35 },
    
  ];

  const filteredProducts = category === "all" ? products : products.filter((product) => product.category === category);

  return (
    <div>
      
      <Container maxWidth="md" style={{ marginTop: 20, marginBottom: 20 }}>
        <FormControl fullWidth>
          <InputLabel id="category-select-label" style={{ marginTop: -10, marginBottom: 5 }}>Select Category</InputLabel>
          <Select
            labelId="category-select-label"
            id="category-select"
            value={category}
            onChange={handleCategoryChange}
          >
            <MenuItem value="all">All Categories</MenuItem>
            <MenuItem value="Electronics">Electronics</MenuItem>
            <MenuItem value="Clothing">Clothing</MenuItem>
            <MenuItem value="Accessories">Accessories</MenuItem>
            
          </Select>
        </FormControl>
      </Container>

      
      <Container maxWidth="md">
        <Grid container spacing={4}>
          {filteredProducts.map((product) => (
            <Grid item key={product.id} xs={12} sm={6} md={4}>
              <Card>
                <CardMedia
                  component="img"
                  height="140"
                  image={`https://via.placeholder.com/300?text=${product.name}`}
                  alt={product.name}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {product.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Category: {product.category}
                  </Typography>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => {
                      addToCart(product);
                      handleAddToCart(); // Añade el producto al carrito y muestra la notificación
                    }}
                    endIcon={<AddShoppingCartIcon />}
                  >
                    Add to Cart
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        message="Product added to cart!"
      />
    </div>
  );
};

export default Products;
