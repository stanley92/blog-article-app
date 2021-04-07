const express = require('express');

const ArticleController = require('../controllers/article-controller');

const router = express.Router();

router.post('/article', ArticleController.createArticle);
router.get('/article/:id', ArticleController.getArticleById);
router.get('/articles', ArticleController.getArticles);
router.put('/article/:id', ArticleController.updateArticle);
router.delete('/article/:id', ArticleController.deleteArticle);

module.exports = router;