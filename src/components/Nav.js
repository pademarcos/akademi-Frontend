import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  CssBaseline,
  Menu,
  MenuItem,
  IconButton,
  Badge,
} from '@mui/material';
import { Link } from 'react-router-dom';  
import { AccountCircle, ShoppingCart } from '@mui/icons-material';

const Nav = ({ cartItems }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

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
          <Button component={Link} to="/contact" color="inherit">
            Contact
          </Button>

          
          <IconButton color="inherit" onClick={handleMenuClick}>
            <AccountCircle />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
          >
            <MenuItem component={Link} to="/login" onClick={handleMenuClose}>
              Login
            </MenuItem>
            <MenuItem component={Link} to="/register" onClick={handleMenuClose}>
              Register
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
      <Container></Container>
    </div>
  );
};

export default Nav;
