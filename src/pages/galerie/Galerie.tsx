import React from "react";
import {
  Box,
  Typography,
  Button as MuiButton,
  Link as MuiLink,
} from "@mui/material";
import { Link } from "react-router-dom";
import "./galerie.css";
import ButtonList from "../../buttons/ButtonList";

const Galerie: React.FC = () => {
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
        className="wrapper"
      >
        <img
          src="/images/23131997_151727948772917_3480797518337250454_n.jpg"
          alt="Image 1"
          className="gallery-image"
        />
        <img
          src="/images/23154859_151729445439434_7685232265963425465_o.jpg"
          alt="Image 2"
          className="gallery-image"
        />
        <img
          src="/images/23270397_151729338772778_3783042040620898528_o.jpg"
          alt="Image 3"
          className="gallery-image"
        />
        <img
          src="/images/29314992_187003925245319_7866413549596180480_n.jpg"
          alt="Image 4"
          className="gallery-image"
        />
        <img
          src="/images/356662157_788911399694050_4722416105310848744_n.jpg"
          alt="Image 6"
          className="gallery-image"
        />
        <img
          src="/images/atelier-mandala.jpg"
          alt="Image 7"
          className="gallery-image"
        />
        <img
          src="/images/318550733_537477278254373_8938355572463078112_n.jpg"
          alt="Image 8"
          className="gallery-image"
        />
        <img
          src="/images/356886216_788906619694528_2916065209903121701_n.jpg"
          alt="Image 9"
          className="gallery-image"
        />
        <img
          src="/images/356895929_788908296361027_9204917871376451573_n.jpg"
          alt="Image 10"
          className="gallery-image"
        />
        <img
          src="/images/356921561_788910156360841_3756853180285245466_n.jpg"
          alt="Image 11"
          className="gallery-image"
        />
        <img
          src="/images/357734770_789448302973693_7421590229041160526_n.jpg"
          alt="Image 12"
          className="gallery-image"
        />
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
          <ButtonList />
        </Box>
      </Box>
    </Box>
  );
};

export default Galerie;
