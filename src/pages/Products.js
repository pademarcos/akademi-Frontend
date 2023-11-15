import React, { useState, useEffect } from "react";
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
  Snackbar,
} from "@mui/material";
import { AddShoppingCart as AddShoppingCartIcon } from "@mui/icons-material";

const Products = ({ addToCart }) => {
  const [category, setCategory] = useState("all");
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  useEffect(() => {
    // Realiza una solicitud a la API para obtener la lista de categorías
    fetch("http://localhost:4000/api/categories")
      .then((response) => response.json())
      .then((data) => {
        // Agrega la categoría especial "Uncategorized" para productos sin categoría
        const categoriesWithUncategorized = [
          { _id: "_uncategorized", name: "Uncategorized" },
          ...data.categories,
        ];
        setCategories(categoriesWithUncategorized);
      })
      .catch((error) => console.error("Error fetching categories:", error));
  }, []);

  useEffect(() => {
    // Realiza una solicitud a la API para obtener la lista de productos según la categoría seleccionada
    const url =
      category === "all"
        ? "http://localhost:4000/api/products"
        : `http://localhost:4000/api/products/category/${category}`;

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setProducts(data.products || []); 
      })
      .catch((error) => console.error("Error fetching products:", error));
  }, [category]);

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  const handleAddToCart = () => {
    //agregar productos al carrito
    setOpenSnackbar(true);
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  const filteredProducts =
    category === "all"
      ? products
      : products.filter((product) =>
       product.category_id ? product.category_id === category : category === "_uncategorized");

    return (
      <div>
        <Container maxWidth="md" style={{ marginTop: 20, marginBottom: 20 }}>
          <FormControl fullWidth>
            <Select
              value={category}
              onChange={handleCategoryChange}
            >
              <MenuItem value="all">All Categories</MenuItem>
              {categories.map((cat) => (
                <MenuItem key={cat._id} value={cat._id}>
                  {cat.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Container>
  
        <Container maxWidth="md">
          <Grid container spacing={4}>
            {products.map((product) => (
              <Grid item key={product._id} xs={12} sm={6} md={4}>
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
                      Category: {product.category_id ? product.category_id.name : "Uncategorized"}
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