import React from "react";
import { Box, Typography } from "@mui/material";
import "./homepage.css";
import ButtonList from "../../buttons/ButtonList";

const Homepage: React.FC = () => {
  return (
    <Box
      display="flex"
      flexDirection={{ xs: "column", md: "row" }}
      height="auto"
      background-color="red"
    >
      <Box
        flex={1}
        bgcolor="#FAD9D9"
        display="flex"
        justifyContent="center"
        alignItems="center"
        className="image-section"
      >
        <Box className="imgContainer">
          <img
            src="/images/homepage-img.jpg"
            className="main-img"
            alt="marilyne profile pic"
          />
        </Box>
      </Box>

      <Box
        flex={1}
        display="flex"
        alignItems="center"
        justifyContent="center"
        position="relative"
        className="text-section"
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
        <Box position="relative" zIndex={1} p={2}>
          <Typography variant="h1" className="nameTitle">
            Marilyne Lortet
          </Typography>
          <Typography variant="h1" className="contentTitle">
            Atelier sérénité
          </Typography>
          <Typography paragraph className="descr">
            Atelier de sophro-relaxation, soins énergétiques et art-thérapie par
            la peinture spontanée et le mandala
          </Typography>
          <ButtonList />
        </Box>
      </Box>
    </Box>
  );
};

export default Homepage;
