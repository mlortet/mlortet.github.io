import React from "react";
import { useLocation } from "react-router-dom";
import Button from "./Buttons";
import { Box, Link as MuiLink } from "@mui/material";
import "./buttons.css";

const buttonData = [
  { name: "Galerie", link: "/galerie" },
  { name: "Actualités", link: "/actualites" },
  { name: "Soins", link: "/soins" },
  { name: "Ateliers", link: "/ateliers" },
  { name: "Séances de groupe", link: "/groupes" },
  { name: "Seniors", link: "/seniors" },
  { name: "Peintures vibratoires", link: "/peintures" },
  { name: "Attrape rêves", link: "/attrapereves" },
  { name: "Contact", link: "/contact" },
];

const ButtonList: React.FC = () => {
  const location = useLocation(); // Récupère l'URL actuelle

  return (
    <>
      <Box
        className="buttons"
        display="flex"
        flexDirection="column"
        alignItems="center"
        mt={2}
      >
        {buttonData.map((btn, index) => (
          <Button
            key={index}
            name={btn.name}
            link={btn.link}
            isSelected={location.pathname === btn.link} // Compare l'URL actuelle
          />
        ))}
      </Box>
      <Box className="socials-icon" mt={2}>
        <MuiLink
          href="https://www.facebook.com/atelierserenitemarilynelortet/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src="/images/fb_icon.svg"
            alt="Facebook"
            width="30"
            height="30"
          />
        </MuiLink>
        <MuiLink
          href="https://www.instagram.com/atelier_serenite_m.lortet/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src="/images/instagram.svg"
            alt="Instagram"
            width="45"
            height="45"
          />
        </MuiLink>
      </Box>
    </>
  );
};

export default ButtonList;
