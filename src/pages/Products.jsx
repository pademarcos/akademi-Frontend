import React, { useState, useEffect, useCallback } from "react";
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
  IconButton,
  Box,
} from "@mui/material";
import {
  AddShoppingCart as AddShoppingCartIcon,
  Add as AddIcon,
  Delete as DeleteIcon,
} from "@mui/icons-material";
import CreateCategoryModal from "../components/Modals/CreateCategoryModal";
import DeleteConfirmationModal from "../components/Modals/DeleteConfirmationModal";
import CreateProductModal from "../components/Modals/CreateProductModal";
import DeleteCategoryModal from "../components/Modals/DeleteCategoryModal";
import ErrorModal from "../components/Modals/ErrorModal";

const Products = ({ addToCart }) => {
  const [category, setCategory] = useState("all");
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [isModalOpen, setModalOpen] = useState(false);
  const [isErrorModalOpen, setErrorModalOpen] = useState(false);
  const [isDeleteModalCategoryOpen, setDeleteModalCategoryOpen] = useState(false);
  const [newProductData, setNewProductData] = useState({
    name: "",
    price: 0,
    brand: "",
    description: "",
    category_id: "",
  });
  const [isProductModalOpen, setProductModalOpen] = useState(false);
  const [productIdToDelete, setProductIdToDelete] = useState(null);
  const [isDeleteModalProductOpen, setDeleteModalProductOpen] = useState(false);

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
  const fetchProducts = useCallback(() => {
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
    setNewProductData({ name: "", price: 0, brand: "", description: "", category_id: "" });
    setProductModalOpen(true);
  };

  const handleCloseProductModal = () => {
    setProductModalOpen(false);
  }

  // Handle the opening of the modal for creating a new category
  const handleOpenCategoryModal = () => {
    setNewCategoryName("")
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
    setDeleteModalCategoryOpen(true);
  };
  
  // Handle closing the modal for deleting a category
  const handleCloseDeleteModal = () => {
    setDeleteModalCategoryOpen(false);
  };
  
// Handle opening the modal for deleting a product
  const handleOpenDeleteProductModal = (product) => {
    setProductIdToDelete(product._id);
    setDeleteModalProductOpen(true)
  };
  
  // Handle closing the modal for deleting a product
  const handleCloseDeleteProductModal = () => {
    setProductIdToDelete(null);
    setDeleteModalProductOpen(false);
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

  const handleDeleteProduct = (product) => {
    const productId = product;
    console.log("Deleting product with ID:", product);
  
    // Llama a la API para eliminar el producto con el ID proporcionado
    fetch(`http://localhost:4000/api/products/${productId}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((data) => {
        // Actualiza la lista de productos después de la eliminación
        fetchProducts();
        // Cierra el modal de confirmación de eliminación
        handleCloseDeleteProductModal();
      })
      .catch((error) => console.error("Error deleting product:", error));
  };


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
                  <Button
                        variant="outlined"
                        color="secondary"
                        onClick={() => handleOpenDeleteProductModal(product)}
                      >
                        Delete
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
        <CreateCategoryModal newCategoryName={newCategoryName} setNewCategoryName={setNewCategoryName} handleCreateCategory={handleCreateCategory}/>
      </Modal>

      {/* Modal para crear producto */}
      <Modal
        open={isProductModalOpen}
        onClose={handleCloseProductModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <CreateProductModal setNewProductData={setNewProductData} handleCreateProduct={handleCreateProduct} newProductData={newProductData} categories={categories}/>
      </Modal>

      {/* Modal para borrar producto */}
      <Modal
        open={isDeleteModalProductOpen}
        onClose={handleCloseDeleteProductModal}
        aria-labelledby="delete-modal-title"
        aria-describedby="delete-modal-description"
      >
        <DeleteConfirmationModal handleDeleteProduct={handleDeleteProduct} productIdToDelete={productIdToDelete} handleCloseDeleteProductModal={handleCloseDeleteProductModal}/>
      </Modal>

      {/* Modal para mostrar error */}
      <Modal
        open={isErrorModalOpen}
        onClose={handleCloseErrorModal}
        aria-labelledby="error-modal-title"
        aria-describedby="error-modal-description"
      >
        <ErrorModal handleCloseErrorModal={handleCloseErrorModal}/>
      </Modal>

      {/* Modal for deleting a category */}
      <Modal
        open={isDeleteModalCategoryOpen}
        onClose={handleCloseDeleteModal}
        aria-labelledby="delete-modal-title"
        aria-describedby="delete-modal-description"
      >
        <DeleteCategoryModal handleDeleteCategory={handleDeleteCategory} categories={categories} handleCloseDeleteModal={handleCloseDeleteModal} DeleteIcon={DeleteIcon} />
      </Modal>
    </div>
  );
};

export default Products;