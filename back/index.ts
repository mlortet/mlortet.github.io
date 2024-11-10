import "reflect-metadata"; // pour TypeORM
import express, { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { AppDataSource } from "./ormconfig"; // pour la connexion à la base de données
import { Admin } from "./entities/Admin"; // entité Admin

// Charger les variables d'environnement
dotenv.config();

const app = express();
app.use(express.json());

// Initialiser la base de données SQLite
AppDataSource.initialize()
  .then(async () => {
    console.log("Connexion à la base de données réussie!");

    // Vérifie si un admin existe déjà
    const adminRepository = AppDataSource.getRepository(Admin);
    const adminExists = await adminRepository.count();
    if (adminExists === 0) {
      // Si aucun admin n'existe, en créer un
      const admin = new Admin();
      admin.username = "admin"; // Choisir un nom d'utilisateur
      admin.password = "admin123"; // Choisir un mot de passe
      await adminRepository.save(admin);
      console.log("Admin par défaut créé");
    }
  })
  .catch((error) => {
    console.error("Erreur de connexion à la base de données:", error);
  });

// Route de login
// Route de login avec bloc try-catch pour capturer les erreurs
app.post("/admin/login", async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    const adminRepository = AppDataSource.getRepository(Admin);

    // Recherche de l'admin dans la base
    const admin = await adminRepository.findOneBy({ username });
    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    // Comparaison du mot de passe
    const isPasswordValid = await bcrypt.compare(password, admin.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Vérification de la clé secrète pour JWT
    const secretKey = process.env.JWT_SECRET;
    if (!secretKey) {
      throw new Error("JWT_SECRET is not defined");
    }

    // Génération du token JWT
    const token = jwt.sign({ id: admin.id }, secretKey, {
      expiresIn: "1h",
    });

    // Retourner le token
    res.json({ token });
  } catch (error) {
    console.error("Erreur dans la route de login:", error); // Log de l'erreur pour diagnostic
    res.status(500).json({ message: "Internal server error" });
  }
});

// Démarrer le serveur sur le port spécifié
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
