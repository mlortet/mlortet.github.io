import React, { useState } from "react";
import axios from "axios";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Fonction asynchrone encapsulée
    function submitForm() {
      axios
        .post("http://localhost:3000/login", { email, password })
        .then((response) => {
          console.log(response.data);
          // Gérer la redirection ou le succès
        })
        .catch((err) => {
          setError("Identifiants incorrects");
          console.error(err);
        })
        .finally(() => {
          setLoading(false);
        });
    }

    submitForm();
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="login-form">
        <h2>Connexion</h2>

        {error && <p className="error-message">{error}</p>}

        <div className="input-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="input-group">
          <label htmlFor="password">Mot de passe</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="login-button" disabled={loading}>
          {loading ? "Chargement..." : "Se connecter"}
        </button>
      </form>
    </div>
  );
};

export default Login;
