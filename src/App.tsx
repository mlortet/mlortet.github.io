import React from "react";
import { HashRouter, Route, Routes } from "react-router-dom";
import Homepage from "./pages/homepage/Homepage";
import Galerie from "./pages/galerie/Galerie";
import Actualites from "./pages/actualites/Actualites";
import Contact from "./pages/contact/Contact";
import Soins from "./pages/soins/Soins";
import TestLogin from "./pages/admin/login/TestLogin";
import AdminDashboard from "./pages/admin/dashboard/AdminDashboard";
import CreateArticle from "./pages/admin/dashboard/CreateArticle";
import ManageArticles from "./pages/admin/dashboard/ManageArticles";
import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  body, h1, h2, h3, h4, h5, h6, p, a, span, div {
    color: #365F9F !important;
  }
`;

const App: React.FC = () => {
  return (
    <>
      <GlobalStyle />
      <HashRouter>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/galerie" element={<Galerie />} />
          <Route path="/actualites" element={<Actualites />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/soins" element={<Soins />} />
          <Route path="/ateliers" element={<Soins />} />
          <Route path="/groupes" element={<Soins />} />
          <Route path="/seniors" element={<Soins />} />
          <Route path="/peintures" element={<Soins />} />
          <Route path="/attrapereves" element={<Soins />} />
          <Route path="/login" element={<TestLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/create-article" element={<CreateArticle />} />
          <Route path="/admin/manage-articles" element={<ManageArticles />} />
        </Routes>
      </HashRouter>
    </>
  );
};

export default App;
