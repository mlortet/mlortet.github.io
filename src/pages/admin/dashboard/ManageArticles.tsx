import React from "react";

const ManageArticles: React.FC = () => {
  // Liste d'exemple d'articles (à remplacer par des données récupérées depuis le backend)
  const articles = [
    {
      id: 1,
      title: "Premier article",
      excerpt: "Ceci est un aperçu du premier article.",
    },
    {
      id: 2,
      title: "Deuxième article",
      excerpt: "Ceci est un aperçu du deuxième article.",
    },
  ];

  const handleEdit = (id: number) => {
    alert(`Modifier l'article ${id}`);
  };

  const handleDelete = (id: number) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer cet article ?")) {
      alert(`Article ${id} supprimé`);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "20px",
      }}
    >
      <h2>Gérer les articles</h2>
      {articles.map((article) => (
        <div
          key={article.id}
          style={{
            border: "1px solid #ccc",
            padding: "10px",
            margin: "5px",
            width: "100%",
          }}
        >
          <h3>{article.title}</h3>
          <p>{article.excerpt}</p>
          <button
            onClick={() => handleEdit(article.id)}
            style={{ marginRight: "5px" }}
          >
            Modifier
          </button>
          <button onClick={() => handleDelete(article.id)}>Supprimer</button>
        </div>
      ))}
    </div>
  );
};

export default ManageArticles;
