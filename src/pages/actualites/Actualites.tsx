import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import ButtonList from "../../buttons/ButtonList";

type Article = {
  title: string;
  content: string;
  imageUrl: string;
};

const Actualites: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>([]);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:3001";
        const response = await fetch(`${apiUrl}/api/articles`);

        if (!response.ok) {
          throw new Error("Erreur lors du chargement des articles.");
        }

        const data = (await response.json()) as Article[];
        setArticles(data);
      } catch (error) {
        console.error("Erreur lors du chargement des articles:", error);
      }
    };

    void fetchArticles();
  }, []);

  return (
    <Box
      display="flex"
      flexDirection={{ xs: "column", md: "row" }}
      height="100%"
    >
      {/* Colonne de gauche */}
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
        {articles.length === 0 ? (
          <p>Aucun article disponible.</p>
        ) : (
          articles.map((article, index) => (
            <div key={index}>
              <h2>{article.title}</h2>
              <img
                src={article.imageUrl}
                alt={article.title}
                style={{ width: "300px" }}
              />
              <p>{article.content}</p>
            </div>
          ))
        )}
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
          <ButtonList />
        </Box>
      </Box>
    </Box>
  );
};

export default Actualites;
