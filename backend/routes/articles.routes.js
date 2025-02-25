const express = require("express");
const Article = require("../models/Article");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/articles", authMiddleware, async (req, res) => {
  console.log("Headers reçus :", req.headers);
  try {
    const { title, content, imageUrl } = req.body;

    if (!title || !content) {
      return res.status(400).json({ error: "Tous les champs sont requis" });
    }

    const newArticle = new Article({
      title,
      content,
      imageUrl: imageUrl || null,
    });
    await newArticle.save();

    res.status(201).json(newArticle);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/articles", async (req, res) => {
  try {
    const articles = await Article.find();
    res.json(articles);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put("/articles/:id", async (req, res) => {
  try {
    const { title, content, imageUrl } = req.body;
    const updatedArticle = await Article.findByIdAndUpdate(
      req.params.id,
      { title, content, imageUrl },
      { new: true }
    );
    res.json(updatedArticle);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete("/articles/:id", async (req, res) => {
  try {
    await Article.findByIdAndDelete(req.params.id);
    res.json({ message: "Article supprimé" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
