import React, { useState } from "react";
import {
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Typography,
  Button,
} from "@mui/material";
import { Delete as DeleteIcon } from "@mui/icons-material";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);

  const removeFromCart = (itemId) => {
    const updatedCart = cartItems.filter((item) => item.id !== itemId);
    setCartItems(updatedCart);
  };
  console.log("Rendering Cart component");
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
            <ListItem key={item.id}>
              <ListItemText
                primary={item.name}
                secondary={`Quantity: ${item.quantity}`}
              />
              <ListItemSecondaryAction>
                <Button
                  color="secondary"
                  onClick={() => removeFromCart(item.id)}
                  startIcon={<DeleteIcon />}
                >
                  Remove
                </Button>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      )}
    </div>
  );
};

export default Cart;
