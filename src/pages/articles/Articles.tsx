import React from "react";
import {
  Box,
  Typography,
  Button as MuiButton,
  Link as MuiLink,
} from "@mui/material";
import { Link } from "react-router-dom";
import ArticleCard from "./ArticleCard";
import "./articles.css";

const Articles: React.FC = () => {
  // Exemple de données d'articles
  const articles = [
    {
      title: "Article 1",
      content: "Aperçu du contenu de l'article 1.",
      imageUrl: "/images/article1.jpg",
    },
    {
      title: "Article 2",
      content: "Aperçu du contenu de l'article 2.",
    },
    {
      title: "Article 3",
      content: "Aperçu du contenu de l'article 3.",
    },
  ];

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
        display="flex"
        flexDirection="column"
        p={2}
        bgcolor="#FAD9D9"
        overflow="auto"
      >
        {articles.map((article, index) => (
          <ArticleCard
            key={index}
            title={article.title}
            content={article.content}
            imageUrl={article.imageUrl}
          />
        ))}
      </Box>

      {/* Colonne à droite */}
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
          </Box>

          <Typography variant="h1" className="nameTitle">
            Articles
          </Typography>

          <Box
            className="buttons"
            display="flex"
            flexDirection="column"
            alignItems="center"
            mt={2}
          >
            <MuiButton variant="contained" component={Link} to="/contact">
              Contact
            </MuiButton>
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

export default Articles;
