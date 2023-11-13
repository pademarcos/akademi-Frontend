import React, { Fragment, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Nav from "./components/Nav";
import Footer from "./components/Footer";

import Contact from "./pages/Contact";
import Home from "./pages/Home";
import Products from "./pages/Products";
import Cart from "./pages/Cart";

function App() {
  const [cartItems, setCartItems] = useState([]);


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




  return (
    <Fragment>
      <div className="App">
        <Header />

        <BrowserRouter>
          <Nav />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products addToCart={addToCart} />} />
            <Route path="/cart" element={<Cart cartItems={cartItems} removeFromCart={removeFromCart} />}
            />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </BrowserRouter>

        <Footer />
      </div>
    </Fragment>
  );
}

export default App;
