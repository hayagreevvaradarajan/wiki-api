const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const ejs = require("ejs");
require('dotenv').config({path: __dirname + '/.env'});

const app = express();

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json())
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/wikiDB");

const articleSchema = {
    title: String,
    content: String
};

const Article = mongoose.model("Article", articleSchema);

app.get("/articles", (req, res) => {
    Article.find({}, (err, foundArticles) => {
        if(!err){
            res.send(foundArticles);
        } else{
            res.send(err);
        }
    });
});

app.post("/articles", (req, res) => {
    const title = req.body.title;
    const content = req.body.content;
    const newArticle = new Article({
        title: title,
        content: content
    });
    newArticle.save((err) => {
        if(!err){
            res.send(`Successfully added ${title}`)
        }
    });
});

app.delete("/articles", (req, res) => {
    Article.deleteMany((err) => {
        if(!err){
            res.send("Deleted all articles successfully");
        } else{
            res.send(err);
        }
    });
});

const port = process.env.PORT;
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});