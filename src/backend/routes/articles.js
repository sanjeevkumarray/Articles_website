const express = require('express');
const router = express.Router();
const authMiddleware = require('../utils/auth');
const Article = require('../models/article');

// Get all articles
router.get('/', (req, res) => {
  Article.find()
    .populate('author', 'username')
    .exec((err, articles) => {
      if (err) {
        res.status(500).json({ error: 'Internal server error' });
      } else {
        res.json(articles);
      }
    });
});

// Get single article
router.get('/:id', (req, res) => {
  Article.findById(req.params.id)
    .populate('author', 'username')
    .exec((err, article) => {
      if (err) {
        res.status(500).json({ error: 'Internal server error' });
      } else if (!article) {
        res.status(404).json({ error: 'Article not found' });
      } else {
        res.json(article);
      }
    });
});

// Create new article
router.post('/', authMiddleware, (req, res) => {
  const { title, content } = req.body;
  const author = req.user._id;

  const newArticle = new Article({ title, content, author });

  newArticle.save((err, article) => {
    if (err) {
      res.status(500).json({ error: 'Internal server error' });
    } else {
      res.status(201).json(article);
    }
  });
});

// Update article
router.put('/:id', authMiddleware, (req, res) => {
  const { title, content } = req.body;
  const author = req.user._id;

  Article.findByIdAndUpdate(
    req.params.id,
    { title, content, author },
    { new: true },
    (err, article) => {
      if (err) {
        res.status(500).json({ error: 'Internal server error' });
      } else if (!article) {
        res.status(404).json({ error: 'Article not found' });
      } else {
        res.json(article);
      }
    }
  );
});

// Delete article
router.delete('/:id', authMiddleware, (req, res) => {
  Article.findByIdAndDelete(req.params.id, (err, article) => {
    if (err) {
      res.status(500).json({ error: 'Internal server error' });
    } else if (!article) {
      res.status(404).json({ error: 'Article not found' });
    } else {
      res.json({ message: 'Article deleted successfully' });
    }
  });
});

module.exports = router;
