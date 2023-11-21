import React from "react";
import {
  Typography,
  Container,
  Grid,
  Card,
  CardContent,
  CardMedia,
  styled,
} from "@mui/material";

const HeroContent = styled("div")({
  padding: (theme) => theme.spacing(8, 0, 6),
  backgroundColor: (theme) => theme.palette.primary.main,
  color: (theme) => theme.palette.common.white,
});

const CardContainer = styled(Container)({
  marginTop: (theme) => theme.spacing(4),
  marginBottom: (theme) => theme.spacing(4),
});

const StyledCard = styled(Card)({
  height: "100%",
  display: "flex",
  flexDirection: "column",
});

const StyledCardMedia = styled(CardMedia)({
  paddingTop: "56.25%", 
});

const HomePage = () => {
  return (
    <div>
      
      <HeroContent>
        <Container maxWidth="sm">
          <Typography component="h1" variant="h2" align="center" gutterBottom>
            Welcome to Techtrend
          </Typography>
          <Typography variant="h5" align="center" paragraph>
            Explore the latest in personal technology at Techtrend. Discover
            state-of-the-art gadgets that enhance your lifestyle.
          </Typography>
        </Container>
      </HeroContent>

      
      <CardContainer maxWidth="md" component="main">
        <Grid container spacing={4}>
          {[1, 2, 3].map((productNumber) => (
            <Grid item key={productNumber} xs={12} sm={6} md={4}>
              <StyledCard>
                <StyledCardMedia
                  image={`/img/e${productNumber}.jpg`}
                  title={`Product ${productNumber}`}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    Featured Product {productNumber}
                  </Typography>
                  <Typography>
                    A description of the featured product. Lorem ipsum dolor
                    sit amet, consectetur adipiscing elit.
                  </Typography>
                </CardContent>
              </StyledCard>
            </Grid>
          ))}
        </Grid>
      </CardContainer>

      
    </div>
  );
};

export default HomePage;
