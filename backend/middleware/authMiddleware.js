const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const authHeader = req.header("Authorization");

  if (!authHeader) {
    return res.status(401).json({ error: "Accès refusé, aucun token fourni" });
  }

  const token = authHeader.split(" ")[1]; // Récupère uniquement le token après "Bearer"

  if (!token) {
    return res.status(401).json({ error: "Format du token invalide" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(403).json({ error: "Token invalide ou expiré" });
  }
};

module.exports = authMiddleware;
