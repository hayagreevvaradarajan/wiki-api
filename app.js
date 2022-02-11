const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const ejs = require("ejs");
const { json } = require("body-parser");
require("dotenv").config({path: __dirname + "/.env"});

const app = express();

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json())
app.use(express.static("public"));

const mongoDBConnectionString = process.env.connectionString;
mongoose.connect(mongoDBConnectionString);

const articleSchema = {
    title: String,
    content: String
};

const Article = mongoose.model("Article", articleSchema);

app.get("/", (req, res) => {
    res.redirect("https://github.com/hayagreevvaradarajan/wiki-api/#readme");
});

app.route("/articles")

.get((req, res) => {
    const foundArticlesWithoutIDAndVersion =  [];
    Article.find({}, (err, foundArticles) => {
        if(!err){
            if(foundArticles.length > 0){
                res.status(200);
                res.setHeader("Content-Type", "application/json");
                foundArticles.forEach((article) => {
                    foundArticlesWithoutIDAndVersion.push({title: article.title, content: article.content});
                });
                res.send(JSON.stringify({"All articles": foundArticlesWithoutIDAndVersion}));
            } else{
                res.status(404);
                res.setHeader("Content-Type", "application/json");
                res.send(JSON.stringify({"message": "No Articles found."}));
            }
        } else{
            res.status(500);
            res.setHeader("Content-Type", "application/json");
            res.send(JSON.stringify({"error": err}));
        }
    });
})

.post((req, res) => {
    const title = req.body.title;
    const content = req.body.content;
    if(typeof title != "undefined" && typeof content != "undefined"){
        const newArticle = new Article({
            title: title,
            content: content
        });
        newArticle.save((err) => {
            if(!err){
                res.status(201);
                res.setHeader("Content-Type", "application/json");
                res.send(JSON.stringify({"message": `Successfully added ${title}.`}));
            } else{
                res.status(500);
                res.setHeader("Content-Type", "application/json");
                res.send(JSON.stringify({"error": err}));
            }
        });
    } else{
        res.status(400);
        res.setHeader("Content-Type", "application/json");
        if(typeof title === "undefined"){
            res.send(JSON.stringify({"error": "title missing from request body."}));
        } else if(typeof content === "undefined"){
            res.send(JSON.stringify({"error": "content missing from request body."}));
        }
    }
})

.delete((req, res) => {
    Article.deleteMany((err) => {
        if(!err){
            res.status(201);
            res.setHeader("Content-Type", "application/json");
            res.send(JSON.stringify({"message": "Deleted all articles successfully."}));
        } else{
            res.status(500);
            res.setHeader("Content-Type", "application/json");
            res.send(JSON.stringify({"error": err}));
        }
    });
});

app.route("/articles/:articleTitle")

.get((req, res) => {
    Article.findOne({title: req.params.articleTitle}, (err, foundArticle) => {
        if(!err){
            if(foundArticle != null){
                res.status(200);
                res.setHeader("Content-Type", "application/json");
                res.send(JSON.stringify({"requested article": {title: foundArticle.title, content: foundArticle.content}}));
            }
            else{
                res.status(404);
                res.setHeader("Content-Type", "application/json");
                res.send(JSON.stringify({"message": `No article matching ${req.params.articleTitle} found.`}));
            }
        } else{
            res.status(500);
            res.setHeader("Content-Type", "application/json");
            res.send(JSON.stringify({"error": err}));
        }
    });
})

.put((req, res) => {
    const newTitle = req.body.title;
    const newContent = req.body.content;
    if(newTitle === undefined && newContent === undefined){
        res.status(400);
        res.setHeader("Content-Type", "application/json");
        res.send(JSON.stringify({"error": "The request body should not be empty."}));
    } else{
        Article.findOneAndUpdate({title: req.params.articleTitle}, 
            {title: newTitle, content: newContent},
            (err, foundArticle) => {
            if(!err){
                if(foundArticle != null){
                    res.status(200);
                    res.setHeader("Content-Type", "application/json");
                    res.send(JSON.stringify({"message": "Successfully updated article."}));
                }
                else{
                    res.status(404);
                    res.setHeader("Content-Type", "application/json");
                    res.send(JSON.stringify({"message": `No article matching ${req.params.articleTitle} found.`}));
                }
            } else{
                res.status(500);
                res.setHeader("Content-Type", "application/json");
                res.send(JSON.stringify({"error": err}));
            }
        });
    }   
})

.patch((req, res) => {
    Article.updateOne({title: req.params.articleTitle}, 
        {title: req.body.title, content: req.body.content},
        (err) => {
        if(!err){
            res.status(200);
            res.setHeader("Content-Type", "application/json");
            res.send(JSON.stringify({"message": "Successfully updated article."}));
        } else{
            res.status(500);
            res.setHeader("Content-Type", "application/json");
            res.send(JSON.stringify({"error": err}));
        }
    });
})

.delete((req, res) => {
    Article.deleteOne({title: req.params.articleTitle},(err, result) => {
        if(!err){
            if(result.deletedCount > 0){
                res.status(200);
                res.setHeader("Content-Type", "application/json");
                res.send(JSON.stringify({"message": `Deleted ${req.params.articleTitle} sucessfully.`}));
            } else{
                res.status(404);
                res.setHeader("Content-Type", "application/json");
                res.send(JSON.stringify({"message": `No article matching ${req.params.articleTitle} found.`}));
            }
        } else{
            res.status(500);
            res.setHeader("Content-Type", "application/json");
            res.send(JSON.stringify({"error": err}));
        }
    });
});

const port = process.env.PORT;
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});