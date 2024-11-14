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

const App: React.FC = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/galerie" element={<Galerie />} />
        <Route path="/actualités" element={<Actualites />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/soins" element={<Soins />} />
        <Route path="/login" element={<TestLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/create-article" element={<CreateArticle />} />
        <Route path="/admin/manage-articles" element={<ManageArticles />} />
      </Routes>
    </HashRouter>
  );
};

export default App;
