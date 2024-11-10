import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Importer useNavigate
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Import des icônes

interface LoginResponse {
  token: string;
}

const Login: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate(); // Initialiser navigate

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post<LoginResponse>("/admin/login", {
        username,
        password,
      });
      localStorage.setItem("token", response.data.token);
      setError("");
      alert("Connexion réussie !");
      navigate("/admin/dashboard"); // Redirection vers le tableau de bord
    } catch (err) {
      setError("Nom d’utilisateur ou mot de passe incorrect");
    }
  };

  // Changer la fonction handleSubmit pour qu'elle soit synchrone
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Appeler la fonction async ici sans la marquer comme asynchrone dans le onSubmit
    handleLogin().catch((err) => console.error(err)); // Gestion d'erreur
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#fff",
      }}
    >
      <form
        onSubmit={handleSubmit} // Utiliser handleSubmit ici
        style={{ textAlign: "center" }}
      >
        <h2 style={{ color: "#000" }}>Admin Login</h2>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <div>
          <input
            type="text"
            placeholder="Nom d'utilisateur"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={{ padding: "8px", margin: "5px 0", width: "100%" }}
          />
        </div>
        <div style={{ position: "relative" }}>
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{
              padding: "8px",
              margin: "5px 0",
              width: "100%",
            }}
          />
          <span
            onClick={togglePasswordVisibility}
            style={{
              position: "absolute",
              right: "10px",
              top: "50%",
              transform: "translateY(-50%)",
              cursor: "pointer",
              fontSize: "20px",
              color: "#000",
            }}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>
        <button
          type="submit"
          style={{
            padding: "8px 16px",
            marginTop: "10px",
            backgroundColor: "#000",
            color: "#fff",
            border: "none",
          }}
        >
          Se connecter
        </button>
      </form>
    </div>
  );
};

export default Login;
