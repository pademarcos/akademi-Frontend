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
  Modal, 
  TextField, 
  IconButton,
  Box,
} from "@mui/material";
import { AddShoppingCart as AddShoppingCartIcon, Add as AddIcon, ErrorOutline as ErrorOutlineIcon } from "@mui/icons-material";

const Products = ({ addToCart }) => {
  const [category, setCategory] = useState("all");
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [isModalOpen, setModalOpen] = useState(false);
  const [isErrorModalOpen, setErrorModalOpen] = useState(false);

  useEffect(() => {
    // Realiza una solicitud a la API para obtener la lista de categorías
    fetch("http://localhost:4000/api/categories")
      .then((response) => response.json())
      .then((data) => {
        // Agrega la categoría especial "Uncategorized" para productos sin categoría
        const categoriesWithUncategorized = [
          // { _id: "_uncategorized", name: "Uncategorized" },
          ...data.categories,
        ];
        setCategories(categoriesWithUncategorized);
      })
      .catch((error) => console.error("Error fetching categories:", error));
  }, [category]);

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

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleCloseErrorModal = () => {
    setErrorModalOpen(false);
  };

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

  const handleCreateCategory = () => {
    // Enviar la nueva categoría al servidor
    fetch("http://localhost:4000/api/categories", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: newCategoryName }),
    })
    .then((response) => response.json())
    .then((data) => {
      if (data.error) {
        // Si hay un error, mostrar el modal de error
        setErrorModalOpen(true);
      } else {
         // Verificar si la categoría ya existe en la lista de categorías antes de agregarla
         const categoryExists = categories.some((cat) => cat._id === data.category._id);

         if (!categoryExists) {
           // Utilizar la función de retorno de llamada en setCategories
           setCategories((prevCategories) => [...prevCategories, data.category]);
           handleCloseModal();
         } else {
           setErrorModalOpen(true);
         }
       }
     })
     .catch((error) => console.error("Error creating category:", error));
 };

  // const filteredProducts =
  // category === "all"
  //   ? products
  //   : products.filter((product) =>
  //       category === "_uncategorized"
  //         ? !product.category_id
  //         : product.category_id === category || !product.category_id
  //     );

    return (
      <div>
        
        <Container maxWidth="md" style={{ marginTop: 20, marginBottom: 20 }}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <FormControl fullWidth>
            <Select value={category} onChange={handleCategoryChange}>
              <MenuItem value="all">All Categories</MenuItem>
              {categories.map((cat) => (
                <MenuItem key={cat._id} value={cat._id}>
                  {cat.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <IconButton color="primary" onClick={handleOpenModal}>
            <AddIcon />
          </IconButton>
        </Box>
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
                        handleAddToCart(); 
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
              <Modal
        open={isModalOpen}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
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
          />
          <Button variant="contained" color="primary" onClick={handleCreateCategory}>
            Create
          </Button>
        </Box>
      </Modal>
       {/* Nuevo modal para mostrar el error */}
       <Modal
        open={isErrorModalOpen}
        onClose={handleCloseErrorModal}
        aria-labelledby="error-modal-title"
        aria-describedby="error-modal-description"
      >
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
          <Typography variant="h6" component="h2" color="error">
            <ErrorOutlineIcon color="error" /> Error
          </Typography>
          <Typography variant="body2" color="text.secondary">
            The category already exists. Please choose a different name.
          </Typography>
          <Button variant="contained" color="primary" onClick={handleCloseErrorModal}>
            OK
          </Button>
        </Box>
      </Modal>
      </div>
    );
  };
  
  export default Products;