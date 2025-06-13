require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const UserModel = require("./models/User");
const Article = require("./models/Article");
const authMiddleware = require("./middleware/authMiddleware");

const app = express();
app.use(express.json());
app.use(cors());

// Vérifie que JWT_SECRET est bien chargé
if (!process.env.JWT_SECRET) {
  console.error("ERREUR : JWT_SECRET n'est pas défini !");
  process.exit(1); // Arrête l'application si la clé est manquante
} else {
  console.log("✅ Clé secrète chargée :", process.env.JWT_SECRET);
}

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.use(
  cors({
    origin: ["https://mlortet.github.io"],
    credentials: true,
  })
);

app.post("/register", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Veuillez remplir tous les champs" });
  }

  const existingUser = await UserModel.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ error: "L'utilisateur existe déjà" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await UserModel.create({ email, password: hashedPassword });

  res.json(user);
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Veuillez remplir tous les champs" });
  }

  try {
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "Identifiants incorrects" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Identifiants incorrects" });
    }

    // Génération du token JWT
    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET, // Clé secrète stockée dans .env
      { expiresIn: "5h" }
    );

    res.json({ message: "Connexion réussie", token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const articlesRoutes = require("./routes/articles.routes");
app.use("/api", articlesRoutes);

app.post("/api/articles", authMiddleware, async (req, res) => {
  try {
    const { title, content, imageUrl } = req.body;

    if (!title || !content) {
      return res.status(400).json({ error: "Tous les champs sont requis" });
    }

    const newArticle = new Article({ title, content, imageUrl });
    await newArticle.save();

    res.status(201).json(newArticle);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(3001, () => {
  console.log("Server is running on port 3001");
});
