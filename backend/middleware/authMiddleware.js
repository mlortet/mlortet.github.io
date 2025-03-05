const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) {
    return res.status(401).json({ error: "Accès refusé, aucun token fourni" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Vérifie et décode le token
    req.user = decoded; // Ajoute l'utilisateur décodé dans `req.user`
    next(); // Passe à la prochaine fonction middleware
  } catch (err) {
    res.status(400).json({ error: "Token invalide" });
  }
};

module.exports = authMiddleware;
