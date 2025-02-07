const express = require("express");
const Article = require("../models/Article");

const router = express.Router();

router.post("/articles", async (req, res) => {
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

module.exports = router;
