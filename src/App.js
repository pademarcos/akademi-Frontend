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
  return (
    <Fragment>
      <div className="App">
        <Header />

        <BrowserRouter>
          <Nav />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products addToCart={setCartItems} />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </BrowserRouter>

        <Footer />
      </div>
    </Fragment>
  );
}

export default App;
