import React from "react";
import {
  Typography,
  Container,
  TextField,
  Button,
  Grid,
  Box,
} from "@mui/material";

const Contact = () => {
  const handleSubmit = (event) => {
    event.preventDefault();
    // Aquí puedes implementar la lógica para enviar el formulario o mostrar un mensaje de éxito.
    console.log("Formulario enviado");
  };

  return (
    <Container maxWidth="md">
      <Typography variant="h4" align="center" gutterBottom>
        Contact Techtrend
      </Typography>

      <Typography variant="body1" paragraph>
        Have questions or suggestions? Contact us using the form below. We
        value your feedback!
      </Typography>

      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              label="Name"
              variant="outlined"
              margin="normal"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              label="Email"
              variant="outlined"
              margin="normal"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              label="Message"
              variant="outlined"
              multiline
              rows={4}
              margin="normal"
            />
          </Grid>
        </Grid>

        <Box mt={2}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
          >
            Send Message
          </Button>
        </Box>
      </form>
    </Container>
  );
};

export default Contact;
