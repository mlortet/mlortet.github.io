import React from "react";
import MuiButton from "@mui/material/Button";
import { Link } from "react-router-dom";

interface ButtonProps {
  name: string;
  link: string;
  className: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

const Button: React.FC<ButtonProps> = ({ name, link }) => {
  return (
    <MuiButton variant="contained" component={Link} to={link}>
      {name}
    </MuiButton>
  );
};

export default Button;
