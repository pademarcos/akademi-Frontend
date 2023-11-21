import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  CssBaseline,
  Badge,
} from '@mui/material';
import { Link } from 'react-router-dom';  
import { ShoppingCart } from '@mui/icons-material';

const Nav = ({ cartItems }) => {


  const totalQuantity = cartItems ? cartItems.reduce((total, item) => total + item.quantity, 0) : 0;

  return (
    <div>
      <CssBaseline />
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Techtrend
          </Typography>
          <Button component={Link} to="/" color="inherit">
            Home
          </Button>
          <Button component={Link} to="/products" color="inherit">
            Products
          </Button>     

          <Button component={Link} to="/cart" color="inherit">
            <Badge badgeContent={totalQuantity} color="error">
      
              <ShoppingCart />
            </Badge>
            Cart
            </Button>
        </Toolbar>
      </AppBar>
     
    </div>
  );
};

export default Nav;
