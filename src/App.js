import React, { Fragment, useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Nav from "./components/Nav";
import Footer from "./components/Footer";

import Contact from "./pages/Contact";
import Home from "./pages/Home";
import Products from "./pages/Products";
import Cart from "./pages/Cart";

function App() {
   // Función para obtener productos desde localStorage
   const getStoredCartItems = () => {
    const storedCartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    return storedCartItems;
  };
  const [cartItems, setCartItems] = useState(getStoredCartItems());

  const addToCart = (product) => {
    // verifica si existe el producto en el cart
    const existingItem = cartItems.find((item) => item.id === product.id);

    if (existingItem) {
      // si existe suma 1
      setCartItems((prevItems) =>
        prevItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      // si no existe en el carrito agrega 1
      
      setCartItems((prevItems) => [...prevItems, { ...product, quantity: 1 }]);
    
    }
  };

  const removeFromCart = (itemId) => {
    const updatedCart = cartItems.filter((item) => item.id !== itemId);
    setCartItems(updatedCart);
  };

  const updateQuantity = (itemId, newQuantity) => {
    // Implementa la lógica para actualizar la cantidad del producto en el carrito aquí
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === itemId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  useEffect(() => {
    // Actualizar localStorage cuando cambie cartItems
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);


  return (
    <Fragment>
      <div className="App">
        <Header />
        <BrowserRouter>
          <Nav cartItems={cartItems} />
          <Routes>
            <Route path="/" element={<Home />} exact />
            <Route path="/products" element={<Products addToCart={addToCart} cartItems={cartItems} />}   />
            <Route path="/cart" element={<Cart cartItems={cartItems} removeFromCart={removeFromCart} updateQuantity={updateQuantity} />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </BrowserRouter>

        <Footer />
      </div>
    </Fragment>
  );
}

export default App;
