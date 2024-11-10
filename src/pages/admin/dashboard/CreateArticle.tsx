import React, { useState } from "react";

const CreateArticle: React.FC = () => {
  const [title, setTitle] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [content, setContent] = useState("");

  const handlePublish = () => {
    // Logique pour enregistrer l'article (à intégrer avec le backend)
    console.log({ title, imageUrl, content });
    alert("Article publié avec succès !");
    setTitle("");
    setImageUrl("");
    setContent("");
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
      <button
        onClick={handlePublish}
        style={{ padding: "10px 20px", marginTop: "10px" }}
      >
        Publier
      </button>
    </div>
  );
};

export default CreateArticle;
