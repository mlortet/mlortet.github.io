import React from "react";
import {
  Box,
  Typography,
  Button as MuiButton,
  Link as MuiLink,
} from "@mui/material";
import { Link } from "react-router-dom";
import "./contact.css";
import ButtonList from "../../buttons/ButtonList";

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
        <Box
          className="contact-left"
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="flex-start"
          p={2}
        >
          <Box display="flex" alignItems="center" mb={2}>
            <img
              src="/images/map-marker_5074102.svg"
              alt="Location"
              width="20"
              height="20"
              style={{ marginRight: "8px" }}
            />
            <Typography variant="body1">Villemur</Typography>
          </Box>
          <Box mb={2}>
            <Typography variant="body1">
              Email:{" "}
              <a href="mailto:m.lortet@wanadoo.fr">m.lortet@wanadoo.fr</a>
            </Typography>
          </Box>
          <Box mb={2}>
            <Typography variant="body1">
              Téléphone: <a href="tel:0621953683">0621953683</a>
            </Typography>
          </Box>
        </Box>
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

export default Contact;
