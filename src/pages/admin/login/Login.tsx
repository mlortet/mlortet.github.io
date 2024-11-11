import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";

interface LoginResponse {
  token: string;
}

const Login: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post<LoginResponse>("/admin/login", {
        username,
        password,
      });

      const token = response.data.token;
      localStorage.setItem("token", token);
      setError(null);
      alert("Connexion réussie !");
      navigate("/admin/dashboard");
    } catch (err) {
      console.error("Erreur de connexion:", err);
      setError("Nom d’utilisateur ou mot de passe incorrect");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleLogin().catch((err) => {
      console.error(err);
    });
  };

  const getAuthHeader = () => {
    const token = localStorage.getItem("token");
    return token ? { Authorization: `Bearer ${token}` } : {};
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
        onSubmit={handleSubmit}
        style={{ textAlign: "center", width: "300px" }}
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
            width: "100%",
            cursor: "pointer",
          }}
        >
          Se connecter
        </button>
      </form>
    </div>
  );
};

export default Login;
