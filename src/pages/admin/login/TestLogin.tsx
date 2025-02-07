import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    axios
      // .post("https://mlortet.github.io/#/login", { email, password })
      .post("http://localhost:3000/login", { email, password })
      .then((response) => {
        console.log(response.data);
        navigate("/admin/dashboard");
      })
      .catch((err) => {
        setError("Identifiants incorrects");
        console.error(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleRegister = (e: React.FormEvent): void => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    axios
      .post("http://localhost:3000/register", { email, password }) // Remplacez par l'URL réelle
      .then((response) => {
        console.log(response.data);
        alert(
          "Compte créé avec succès. Vous pouvez maintenant vous connecter !"
        );
      })
      .catch((err) => {
        setError("Erreur lors de la création du compte");
        console.error(err);
      })
      .finally(() => {
        setLoading(false);
      });
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
        style={{
          textAlign: "center",
          width: "350px",
          padding: "30px",
          borderRadius: "8px",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
          backgroundColor: "#fff",
        }}
      >
        <h2 style={{ color: "#000", marginBottom: "20px" }}>Connexion</h2>

        {error && <p style={{ color: "red", marginBottom: "10px" }}>{error}</p>}

        <div style={{ marginBottom: "20px" }}>
          <label
            htmlFor="email"
            style={{
              display: "block",
              textAlign: "left",
              marginBottom: "5px",
              color: "#000",
            }}
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{
              padding: "10px",
              margin: "5px 0",
              width: "100%",
              border: "1px solid #ccc",
              borderRadius: "4px",
            }}
          />
        </div>

        <div style={{ position: "relative", marginBottom: "20px" }}>
          <label
            htmlFor="password"
            style={{
              display: "block",
              textAlign: "left",
              marginBottom: "5px",
              color: "#000",
            }}
          >
            Mot de passe
          </label>
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{
              padding: "10px",
              margin: "5px 0",
              width: "100%",
              border: "1px solid #ccc",
              borderRadius: "4px",
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
            padding: "10px 16px",
            marginTop: "10px",
            backgroundColor: "#000",
            color: "#fff",
            border: "none",
            width: "100%",
            cursor: "pointer",
            borderRadius: "4px",
          }}
          disabled={loading}
        >
          {loading ? "Chargement..." : "Se connecter"}
        </button>

        <button
          onClick={handleRegister}
          style={{
            padding: "10px 16px",
            marginTop: "10px",
            backgroundColor: "#fff",
            color: "#000",
            border: "1px solid #000",
            width: "100%",
            cursor: "pointer",
            borderRadius: "4px",
          }}
          disabled={loading}
        >
          {loading ? "Chargement..." : "Créer un compte"}
        </button>
      </form>
    </div>
  );
};

export default Login;
