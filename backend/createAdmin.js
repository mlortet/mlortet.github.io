const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
dotenv.config();

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  email: String,
  role: String,
});

const User = mongoose.model("User", userSchema);

const addUser = async () => {
  try {
    console.log(process.env.MONGO_URI);
    await mongoose.connect(process.env.MONGO_URI);

    // Vérifier si l'utilisateur existe déjà
    const existingUser = await User.findOne({
      username: process.env.ADMIN_USERNAME,
    });
    if (existingUser) {
      console.log("L'utilisateur existe déjà !");
      return;
    }

    // Hacher le mot de passe
    const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD, 10);

    // Création de l'utilisateur
    const user = new User({
      username: process.env.ADMIN_USERNAME,
      password: hashedPassword,
      email: process.env.ADMIN_EMAIL,
      role: "admin",
    });

    await user.save();
    console.log("Utilisateur ajouté avec succès !");
  } catch (error) {
    console.error("Erreur lors de l'ajout de l'utilisateur :", error);
  } finally {
    mongoose.connection.close();
  }
};

// Exécuter le script
addUser();
