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
  InputLabel,
} from "@mui/material";
import {
  AddShoppingCart as AddShoppingCartIcon,
  Add as AddIcon,
  ErrorOutline as ErrorOutlineIcon,
  Delete as DeleteIcon,
} from "@mui/icons-material";

const Products = ({ addToCart }) => {
  const [category, setCategory] = useState("all");
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [isModalOpen, setModalOpen] = useState(false);
  const [isErrorModalOpen, setErrorModalOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [newProductData, setNewProductData] = useState({
    name: "",
    price: 0,
    brand: "",
    description: "",
    category_id: "",
  });
  const [isProductModalOpen, setProductModalOpen] = useState(false);


  // Fetch categorias del seervidor
  const fetchCategories = () => {
    fetch("http://localhost:4000/api/categories")
      .then((response) => response.json())
      .then((data) => {
        const categoriesWithUncategorized = [...data.categories];
        setCategories(categoriesWithUncategorized);
      })
      .catch((error) => console.error("Error fetching categories:", error));
  };

  // Fetch productos basado en la categoria seleccionada
  const fetchProducts = () => {
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
  };

  useEffect(() => {
    fetchCategories();
    fetchProducts();
  }, [category, fetchProducts]);


  // manejo para la creacion de producto
  const handleCreateProduct = () => {
    if (
      newProductData.name === "" ||
      newProductData.price <= 0 ||
      newProductData.brand === "" ||
      newProductData.description === "" ||
      newProductData.category_id === ""
    ) {
      setErrorModalOpen(true);
      return;
    }

    // post para crear un nuevo producto
    fetch("http://localhost:4000/api/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newProductData),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          setErrorModalOpen(true);
        } else {
          // actualizacion de la lista de productos
          fetchProducts();
          handleCloseProductModal();
        }
      })
      .catch((error) => console.error("Error creating product:", error));
  };

  // Get el nombre de la categoria segun ID
  const getCategoryName = (categoryId) => {
    const category = categories.find((cat) => cat._id === categoryId);
    return category ? category.name : "Uncategorized";
  };

  // Handle the opening of the modal for creating a new product
  const handleOpenProductModal = () => {
    setProductModalOpen(true);
  };

  const handleCloseProductModal = () => {
    setProductModalOpen(false);
  }

  // Handle the opening of the modal for creating a new category
  const handleOpenCategoryModal = () => {
    setModalOpen(true);
  };
 
  // Handle the closing of the modal for creating a new product
  const handleCloseModal = () => {
    setModalOpen(false);
  };

  // Handle the closing of the error modal
  const handleCloseErrorModal = () => {
    setErrorModalOpen(false);
  };

  // Handle the selection of a category
  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  // Handle adding a product to the cart
  const handleAddToCart = () => {
    // Add products to the cart
    setOpenSnackbar(true);
  };

  // Handle closing the snackbar
  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  // Handle opening the modal for deleting a category
  const handleOpenDeleteModal = () => {
    setDeleteModalOpen(true);
  };

  // Handle closing the modal for deleting a category
  const handleCloseDeleteModal = () => {
    setDeleteModalOpen(false);
  };

  // Handle the creation of a new category
  const handleCreateCategory = () => {
    // Send the new category to the server
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
          // If there's an error, show the error modal
          setErrorModalOpen(true);
        } else {
          // Check if the category already exists in the list of categories before adding it
          const categoryExists = categories.some((cat) => cat._id === data.category._id);

          if (!categoryExists) {
            // Use the callback function in setCategories
            setCategories((prevCategories) => [...prevCategories, data.category]);
            handleCloseModal();
          } else {
            setErrorModalOpen(true);
          }
        }
      })
      .catch((error) => console.error("Error creating category:", error));
  };

  // Handle the deletion of a category
  const handleDeleteCategory = (categoryId) => {
    console.log("Deleting category with ID:", categoryId);
    fetch(`http://localhost:4000/api/categories/${categoryId}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((data) => {
        fetchCategories();
        handleCloseDeleteModal();
      })
      .catch((error) => console.error("Error deleting category:", error));
  };

  // contenido del modal para crear producto
  const createProductModal = (
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
  );

  // contenido del modal para crear categoria
  
  const createCategoryModal = (
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
  );

  // contenido del modal para borrar categoria
  const deleteCategoryModal = (
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
  );

  return (
    <div>
      <Container maxWidth="md" style={{ marginTop: 20, marginBottom: 20 }}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Button
            variant="contained"
            color="primary"
            onClick={handleOpenProductModal}
          >
            Create Product
          </Button>
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
          <IconButton color="primary" onClick={handleOpenCategoryModal}>
            <AddIcon />
          </IconButton>
          <IconButton color="secondary" onClick={handleOpenDeleteModal}>
            <DeleteIcon />
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
                    <strong>Price:</strong> ${product.price}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    <strong>Brand:</strong> {product.brand}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    <strong>Description:</strong> {product.description}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    <strong>Category:</strong> {getCategoryName(product.category_id)}
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

      {/* Modal para crear categoria*/}
      <Modal
        open={isModalOpen}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        {createCategoryModal}
      </Modal>

      {/* Modal para crear producto */}
      <Modal
        open={isProductModalOpen}
        onClose={handleCloseProductModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        {createProductModal}

      </Modal>



      {/* Modal for showing the error */}
      <Modal
        open={isErrorModalOpen}
        onClose={handleCloseErrorModal}
        aria-labelledby="error-modal-title"
        aria-describedby="error-modal-description"
      >
        {createCategoryModal}
      </Modal>

      {/* Modal for deleting a category */}
      <Modal
        open={isDeleteModalOpen}
        onClose={handleCloseDeleteModal}
        aria-labelledby="delete-modal-title"
        aria-describedby="delete-modal-description"
      >
        {deleteCategoryModal}
      </Modal>
    </div>
  );
};

export default Products;