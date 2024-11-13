import React from "react";
import { HashRouter, Route, Routes } from "react-router-dom";
import Homepage from "./pages/homepage/Homepage";
// import Login from "./pages/admin/login/Login";
import TestLogin from "./pages/admin/login/TestLogin";
import AdminDashboard from "./pages/admin/dashboard/AdminDashboard";
import CreateArticle from "./pages/admin/dashboard/CreateArticle";
import ManageArticles from "./pages/admin/dashboard/ManageArticles";

const App: React.FC = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<TestLogin />} />
        {/* <Route path="/admin/login" element={<Login />} /> */}
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/create-article" element={<CreateArticle />} />
        <Route path="/admin/manage-articles" element={<ManageArticles />} />
      </Routes>
    </HashRouter>
  );
};

export default App;
