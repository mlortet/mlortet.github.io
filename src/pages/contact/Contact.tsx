import React from "react";
import {
  Box,
  Typography,
  Button as MuiButton,
  Link as MuiLink,
} from "@mui/material";
import { Link } from "react-router-dom";
import "./contact.css";

const Contact: React.FC = () => {
  return (
    <Box
      display="flex"
      flexDirection={{ xs: "column", md: "row" }}
      height="100%"
    >
      <Box
        flex={1}
        height="100%"
        width={{ xs: "100%", md: "50%" }}
        display="grid"
        gridTemplateColumns="repeat(auto-fill, minmax(200px, 1fr))"
        gap={2}
        p={2}
        bgcolor="#FAD9D9"
      >
        {/* Remplacer ces images par celles du dossier public */}
        <img src="/images/image1.jpg" alt="Image 1" className="gallery-image" />
        <img src="/images/image2.jpg" alt="Image 2" className="gallery-image" />
        <img src="/images/image3.jpg" alt="Image 3" className="gallery-image" />
        <img src="/images/image4.jpg" alt="Image 4" className="gallery-image" />
      </Box>

      <Box
        flex={1}
        height="100%"
        width={{ xs: "100%", md: "50%" }}
        color="white"
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="space-evenly"
        position="relative"
        p={2}
      >
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "linear-gradient(to bottom, #a4bdec, #FAD9D9)",
            filter: "blur(50px)",
            zIndex: -1,
          }}
        />
        <Box position="relative" zIndex={1} width="100%" textAlign="center">
          <Box
            className="buttons"
            display="flex"
            flexDirection="column"
            alignItems="center"
            mt={2}
            mb={3}
          >
            <MuiButton variant="contained" component={Link} to="/">
              Accueil
            </MuiButton>
            <MuiButton variant="contained" component={Link} to="/galerie">
              Galerie
            </MuiButton>
            <MuiButton variant="contained" component={Link} to="/articles">
              Articles
            </MuiButton>
          </Box>

          <Typography variant="h1" className="nameTitle">
            Contact
          </Typography>

          <Box
            className="buttons"
            display="flex"
            flexDirection="column"
            alignItems="center"
            mt={2}
          >
            <MuiButton variant="contained" component={Link} to="/soins">
              Soins
            </MuiButton>
          </Box>

          <Box className="facebook-icon" mt={2}>
            <MuiLink
              href="https://www.facebook.com/atelierserenitemarilynelortet/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src="/images/fb_icon.svg"
                alt="Facebook"
                width="24"
                height="24"
              />
            </MuiLink>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Contact;
