import React from "react";
import Button from "../buttons/Buttons";
import "./homepage.css";

const Homepage: React.FC = () => {
  return (
    <div className="container">
      <div className="left">
        <div className="title">
          <h1>Marilyne Lortet</h1>
        </div>
        <div className="imgContainer">
          <img
            src="/images/main.jpg"
            className="main-img"
            alt="marilyne profile pic"
          />
        </div>
      </div>
      <div className="right">
        <div className="content">
          <h1>Atelier sérénité</h1>
          <p>Paragraphe en dessous du titre</p>
          <div className="buttons">
            <Button name="Galerie" link="/galerie" />
            <Button name="Articles" link="/articles" />
            <Button name="Contact" link="/contact" />
            <Button name="Soins" link="/soins" />
          </div>
          <div className="facebook-icon">
            <a
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
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
