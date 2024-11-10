import React from "react";
import { useNavigate } from "react-router-dom";

const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "20px",
      }}
    >
      <h2>Bienvenue dans le tableau de bord admin</h2>
      <button
        onClick={() => navigate("/admin/create-article")}
        style={{ margin: "10px", padding: "10px 20px" }}
      >
        Écrire un nouvel article
      </button>
      <button
        onClick={() => navigate("/admin/manage-articles")}
        style={{ margin: "10px", padding: "10px 20px" }}
      >
        Gérer les articles
      </button>
      <button
        onClick={() => alert("Option pour modifier une page spécifique")}
        style={{ margin: "10px", padding: "10px 20px" }}
      >
        Modifier des informations sur une page
      </button>
    </div>
  );
};

export default AdminDashboard;
