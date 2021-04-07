const Article = require('../db/models/article');

//To create an Article
createArticle = (req, res) => {
    const body = req.body;
    
    //If there is no data provided, return with message for user to provide data
    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide an article',
        });
    }

    //To create the new article
    const article = new Article(body);

    //If article is not created, return error
    if (!article) {
        return res.status(400).json({ success: false, error: err });
    }

    //To save the created article in the db
    article
        .save()
        .then(() => {
            return res.status(201).json({
                success: true,
                id: article._id,
                message: 'Article created!',
            });
        })
        .catch(error => { //To catch any error from saving the article to db
            return res.status(400).json({
                error,
                message: 'Article not created!',
            });
        });
};

//To retrieve article by Id
getArticleById = async (req, res) => {
    //To look for Article from db
    await Article.findOne({ _id: req.params.id }, (err, article) => {
        //To return if there is an error
        if (err) {
            return res.status(400).json({ success: false, error: err });
        }

        //To return the found article
        return res.status(200).json({ success: true, data: article });
    }).catch(err => console.log(err)); //To catch any error from retrieving the article from db
};

//To retrieve all articles in db
getArticles = async (req, res) => {
    //To look for Articles from db
    await Article.find({}, (err, articles) => {
        //To return if there is an error
        if (err) {
            return res.status(400).json({ success: false, error: err });
        }

        //If no article is found in db, return with message - 'Article not found'
        if (!articles.length) {
            return res
                .status(404)
                .json({ success: false, error: `Article not found` });
        }

        //To return the found articles
        return res.status(200).json({ success: true, data: articles });
    }).catch(err => console.log(err)); //To catch any error from retrieving the articles from db
};


//To update data of exisiting article in the db
updateArticle = async (req, res) => {
    const body = req.body;

    //If there is no data provided, return with message for user to provide data
    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a body to update',
        });
    }

    //To look for Article from db base on id and update it
    Article.findOne({ _id: req.params.id }, (err, article) => {
        //To return if there is an error
        if (err) {
            return res.status(404).json({
                err,
                message: 'Article not found!',
            });
        }

        //To update article attributes with new attributes
        article.title = body.title;
        article.content = body.content;
        
        //To save article to db
        article
            .save()
            .then(() => {
                return res.status(200).json({
                    success: true,
                    id: article._id,
                    message: 'Article updated!',
                });
            })
            .catch(error => {
                return res.status(404).json({
                    error,
                    message: 'Article not updated!',
                });
            }); //To catch any error from updating the article in db
    });
};

//To delete article by Id
deleteArticle = async (req, res) => {
    //To find article and delete it
    await Article.findOneAndDelete({ _id: req.params.id }, (err, article) => {
        //To return if there is an error
        if (err) {
            return res.status(400).json({ success: false, error: err });
        }

        //If article is not found, return with message 'Article not found'
        if (!article) {
            return res
                .status(404)
                .json({ success: false, error: `Article not found` });
        }
        
        //Return retrieved article
        return res.status(200).json({ success: true, data: article });
    }).catch(err => console.log(err)); //To catch any error from retrieving the article and deleting it from db
};

module.exports = {
    createArticle,
    getArticleById,
    getArticles,
    updateArticle,
    deleteArticle
};