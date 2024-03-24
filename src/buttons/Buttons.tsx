import React from "react";

interface ButtonProps {
  name: string;
  link: string;
}

const Button: React.FC<ButtonProps> = ({ name, link }) => {
  return (
    <a href={link} className="button">
      {name}
    </a>
  );
};

export default Button;
