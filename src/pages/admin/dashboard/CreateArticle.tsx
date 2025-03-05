import React, { useState } from "react";

const CreateArticle: React.FC = () => {
  const [title, setTitle] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [content, setContent] = useState("");

  const apiUrl = process.env.REACT_APP_API_URL || "";

  const handlePublish = async () => {
    if (!title || !content) {
      alert("Veuillez remplir le titre et le contenu.");
      return;
    }

    const articleData: { title: string; content: string; imageUrl?: string } = {
      title,
      content,
    };

    if (imageUrl.trim() !== "") {
      articleData.imageUrl = imageUrl;
    }

    try {
      // Récupérer le token JWT depuis localStorage
      const token = localStorage.getItem("token");

      if (!token) {
        alert("Vous devez être connecté pour publier un article.");
        return;
      }

      const response = await fetch(`${apiUrl}/api/articles`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Ajoute le token JWT ici
        },
        body: JSON.stringify(articleData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.error || "Erreur lors de la publication de l'article."
        );
      }

      alert("Article publié avec succès !");
      setTitle("");
      setImageUrl("");
      setContent("");
    } catch (error) {
      console.error(error);

      if (error instanceof Error) {
        alert(error.message);
      } else {
        alert("Une erreur inconnue est survenue.");
      }
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
      <h2>Écrire un nouvel article</h2>
      <input
        type="text"
        placeholder="Titre"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        style={{ padding: "10px", margin: "5px", width: "100%" }}
      />
      <input
        type="text"
        placeholder="URL de l'image"
        value={imageUrl}
        onChange={(e) => setImageUrl(e.target.value)}
        style={{ padding: "10px", margin: "5px", width: "100%" }}
      />
      <textarea
        placeholder="Contenu de l'article"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        style={{
          padding: "10px",
          margin: "5px",
          width: "100%",
          height: "150px",
        }}
      />
      <button onClick={handlePublish}>Publier</button>
    </div>
  );
};

export default CreateArticle;
