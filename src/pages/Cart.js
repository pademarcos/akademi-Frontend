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
              <ListItemText primary={item.name} />
              <Grid container alignItems="center">
                <Grid item>
                  <TextField
                    type="number"
                    value={item.quantity}
                    InputProps={{ inputProps: { min: 1 } }}
                    onChange={(e) => updateQuantity(item.id, parseInt(e.target.value, 10))}
                  />
                </Grid>
                <Grid item>
                  <IconButton
                    color="primary"
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  >
                    <AddIcon />
                  </IconButton>
                </Grid>
                <Grid item>
                  <IconButton
                    color="primary"
                    onClick={() => updateQuantity(item.id, Math.max(item.quantity - 1, 1))}
                  >
                    <RemoveIcon />
                  </IconButton>
                </Grid>
                <ListItemSecondaryAction>
                  <Button
                    color="secondary"
                    onClick={() => removeFromCart(item.id)}
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
    </div>
  );
};

export default Cart;
