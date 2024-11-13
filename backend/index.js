const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcrypt");
const UserModel = require("./models/User");

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect("mongodb://127.0.0.1:27017/user", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(
  cors({
    origin: "http://localhost:3000", // Frontend
    methods: "GET,POST",
    allowedHeaders: "Content-Type,Authorization",
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

app.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Veuillez remplir tous les champs" });
  }

  UserModel.findOne({ email })
    .then((user) => {
      if (!user) {
        console.log("Aucun utilisateur trouvé avec cet email:", email);
        return res.status(400).json({ error: "Identifiants incorrects" });
      }

      console.log("Utilisateur trouvé:", user);

      bcrypt.compare(password, user.password, (err, isMatch) => {
        if (err) {
          console.error(
            "Erreur lors de la comparaison des mots de passe:",
            err
          );
          return res
            .status(500)
            .json({ error: "Erreur de comparaison de mot de passe" });
        }

        console.log("Le mot de passe correspond-il ?", isMatch);

        if (!isMatch) {
          return res.status(400).json({ error: "Identifiants incorrects" });
        }

        res.json({ message: "Connexion réussie", user });
      });
    })
    .catch((err) => {
      console.error("Erreur dans la récupération de l'utilisateur:", err);
      res.status(500).json({ error: err.message });
    });
});

app.listen(3001, () => {
  console.log("Server is running on port 3001");
});
