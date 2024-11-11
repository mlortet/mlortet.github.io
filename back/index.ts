import "reflect-metadata";
import express, { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { AppDataSource } from "./ormconfig";
import { Admin } from "./entities/Admin";

dotenv.config();
const dbUsername = process.env.USERNAME!;
const dbPassword = process.env.PASSWORD!;
const jwtSecret = process.env.JWT_SECRET!;

const app = express();
app.use(express.json());

async function initializeAdmin() {
  const adminRepository = AppDataSource.getRepository(Admin);
  const adminExists = await adminRepository.count();

  if (adminExists === 0) {
    // Crée un nouvel utilisateur admin par défaut s'il n'existe pas déjà
    const admin = new Admin();
    admin.username = dbUsername;
    admin.password = await bcrypt.hash(dbPassword, 10);

    await adminRepository.save(admin);
    console.log("Admin par défaut créé");
  } else {
    console.log("Admin déjà existant en base de données");
  }
}

AppDataSource.initialize()
  .then(async () => {
    console.log("Connexion à la base de données réussie!");
    await initializeAdmin();
  })
  .catch((error) => {
    console.error("Erreur de connexion à la base de données:", error);
  });

app.post("/admin/login", async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    const adminRepository = AppDataSource.getRepository(Admin);

    // Recherche de l'admin dans la bdd
    const admin = await adminRepository.findOneBy({ username });
    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    // Comparaison du mot de passe
    const isPasswordValid = await bcrypt.compare(password, admin.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Génère token
    const token = jwt.sign({ id: admin.id }, jwtSecret, { expiresIn: "1h" });

    // Retourne token
    res.json({ token });
  } catch (error) {
    console.error("Erreur dans la route de login:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

const authenticateJWT = (req: Request, res: Response, next: Function) => {
  const token = req.headers.authorization?.split(" ")[1]; // Format "Bearer <token>"

  if (!token) {
    return res.status(403).json({ message: "Token is required" });
  }

  jwt.verify(token, jwtSecret, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: "Invalid token" });
    }

    // Le token est valide, passe à l'étape suivante
    (req as any).user = decoded; // Ajouter l'info de l'utilisateur décodée à req.user si besoin
    next();
  });
};

app.get("/protected-route", authenticateJWT, (req: Request, res: Response) => {
  res.json({ message: "This is a protected route." });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Serveur en cours d'exécution sur le port ${PORT}`);
});
