const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcrypt");
const UserModel = require("./models/User");
const Article = require("./models/Article");

const app = express();
app.use(express.json());
app.use(cors());

require("dotenv").config();
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// mongoose.connect("mongodb://127.0.0.1:27017/user", {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

app.use(
  cors({
    origin: ["http://localhost:3000", "https://mlortet.github.io"],
    credentials: true,
  })
);

app.post("/register", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Veuillez remplir tous les champs" });
  }

  UserModel.findOne({ email })
    .then((existingUser) => {
      if (existingUser) {
        return res.status(400).json({ error: "L'utilisateur existe déjà" });
      }

      bcrypt.hash(password, 10, (err, hashedPassword) => {
        if (err) {
          return res
            .status(500)
            .json({ error: "Erreur de hachage du mot de passe" });
        }

        UserModel.create({ email, password: hashedPassword })
          .then((user) => res.json(user))
          .catch((err) => res.status(500).json({ error: err.message }));
      });
    })
    .catch((err) => res.status(500).json({ error: err.message }));
});

const jwt = require("jsonwebtoken");

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Veuillez remplir tous les champs" });
  }

  try {
    const user = await UserModel.findOne({ email });

    if (!user) {
      console.log("Aucun utilisateur trouvé avec cet email:", email);
      return res.status(400).json({ error: "Identifiants incorrects" });
    }

    console.log("Utilisateur trouvé:", user);

    const isMatch = await bcrypt.compare(password, user.password);
    console.log("Le mot de passe correspond-il ?", isMatch);

    if (!isMatch) {
      return res.status(400).json({ error: "Identifiants incorrects" });
    }

    // Génération du token JWT
    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET, // Clé secrète stockée dans le fichier .env
      { expiresIn: "1h" } // Expiration du token (1 heure)
    );

    res.json({
      message: "Connexion réussie",
      token, // Renvoi uniquement le token
      user: { id: user._id, email: user.email }, // Ne renvoie pas le password
    });
  } catch (err) {
    console.error("Erreur dans la récupération de l'utilisateur:", err);
    res.status(500).json({ error: err.message });
  }
});

const articlesRoutes = require("./routes/articles.routes");
app.use("/api", articlesRoutes);

app.post("/api/articles", async (req, res) => {
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
