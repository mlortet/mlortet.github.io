import React from "react";
import MuiButton from "@mui/material/Button";
import { Link } from "react-router-dom";

interface ButtonProps {
  name: string;
  link: string;
  // className: string;
  isSelected?: boolean;
  // onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

const Button: React.FC<ButtonProps> = ({
  name,
  link,
  // className,
  isSelected,
}) => {
  return (
    <MuiButton
      variant="contained"
      component={Link}
      to={link}
      // className={`button ${className || ""}`}
      className={`button ${isSelected ? "selected" : ""}`}
    >
      {name}
    </MuiButton>
  );
};

export default Button;

// import React from "react";
// import { Button as MuiButton } from "@mui/material";
// import { Link } from "react-router-dom";
// import "./buttons.css";

// interface ButtonProps {
//   name: string;
//   link: string;
//   isSelected?: boolean;
// }

// const Button: React.FC<ButtonProps> = ({ name, link, isSelected }) => {
//   return (
//     <Link to={link} className={`button ${isSelected ? "selected" : ""}`}>
//       <MuiButton variant="contained">{name}</MuiButton>
//     </Link>
//   );
// };

// export default Button;
