import React from "react";
import {
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Typography,
  Button,
  IconButton,
  TextField,
  Grid,
} from "@mui/material";
import { Delete as DeleteIcon, Add as AddIcon, Remove as RemoveIcon } from "@mui/icons-material";


const Cart = ({ cartItems, removeFromCart, updateQuantity }) => {
  const calculateItemTotal = (item) => {
    return item.price * item.quantity;
  };

  const calculateCartTotal = () => {
    return cartItems.reduce((total, item) => total + calculateItemTotal(item), 0);
  };
  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Shopping Cart
      </Typography>
      {cartItems.length === 0 ? (
        <Typography variant="subtitle1">Your cart is empty.</Typography>
      ) : (
        <List>
          {cartItems.map((item) => (
            <ListItem key={item._id}>
              <ListItemText primary={item.name}  secondary={`Price: $${item.price}`}/>
              <Grid container alignItems="center">
                <Grid item>
                  <TextField
                    type="number"
                    value={item.quantity}
                    InputProps={{ inputProps: { min: 1 } }}
                    onChange={(e) => updateQuantity(item._id, parseInt(e.target.value, 10))}
                  />
                </Grid>
                <Grid item>
                  <IconButton
                    color="primary"
                    onClick={() => updateQuantity(item._id, item.quantity + 1)}
                  >
                    <AddIcon />
                  </IconButton>
                </Grid>
                <Grid item>
                  <IconButton
                    color="primary"
                    onClick={() => updateQuantity(item._id, Math.max(item.quantity - 1, 1))}
                  >
                    <RemoveIcon />
                  </IconButton>
                </Grid>
                <ListItemSecondaryAction>
                <Typography variant="subtitle1">
                    Unit Price: ${item.price} | Total: ${calculateItemTotal(item)}
                  </Typography>
                  <Button
                    color="secondary"
                    onClick={() => removeFromCart(item._id)}
                    startIcon={<DeleteIcon />}
                  >
                    Remove
                  </Button>
                </ListItemSecondaryAction>
              </Grid>
            </ListItem>
          ))}
        </List>
      )}
        <Typography variant="h6" style={{ marginTop: 20 }}>
        Total: ${calculateCartTotal()}
      </Typography>
    </div>
  );
};

export default Cart;
