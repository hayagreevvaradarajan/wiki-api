const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const ejs = require("ejs");
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
    res.redirect("https://github.com/hayagreevvaradarajan/wiki-api/");
});

app.route("/articles")
.get((req, res) => {
    Article.find({}, (err, foundArticles) => {
        if(!err){
            res.status(200);
            res.setHeader("Content-Type", "application/json");
            res.send(JSON.stringify({"All articles": foundArticles}));
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
    const newArticle = new Article({
        title: title,
        content: content
    });
    newArticle.save((err) => {
        if(!err){
            res.status(201);
            res.setHeader("Content-Type", "application/json");
            res.send(JSON.stringify({"message": `Successfully added ${title}`}));
        } else{
            res.status(500);
            res.setHeader("Content-Type", "application/json");
            res.send(JSON.stringify({"error": err}));
        }
    });
})
.delete((req, res) => {
    Article.deleteMany((err) => {
        if(!err){
            res.send(200);
            res.setHeader("Content-Type", "application/json");
            res.send(JSON.stringify({"message": "Deleted all articles successfully"}));
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
                res.send(foundArticle);
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
    Article.findOneAndUpdate({title: req.params.articleTitle}, 
        {title: req.body.title, content: req.body.content},
        (err) => {
        if(!err){
            res.status(200);
            res.setHeader("Content-Type", "application/json");
            res.send(JSON.stringify({"message": "Successfully updated article"}));
        } else{
            res.status(500);
            res.setHeader("Content-Type", "application/json");
            res.send(JSON.stringify({"error": err}));
        }
    });
})

.patch((req, res) => {
    Article.updateOne({title: req.params.articleTitle}, 
        {title: req.body.title, content: req.body.content},
        (err) => {
        if(!err){
            res.status(200);
            res.setHeader("Content-Type", "application/json");
            res.send(JSON.stringify({"message": "Successfully updated article"}));
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
            res.status(200);
            res.setHeader("Content-Type", "application/json");
            res.send(JSON.stringify({"message": `Deleted ${req.params.articleTitle} sucessfully.`}));
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