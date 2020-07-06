const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
var _ = require('lodash');
const { forEach } = require('lodash');
const mongoose = require('mongoose');


const app = express();


app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");

mongoose.connect('mongodb://localhost:27017/blogDB', { useNewUrlParser: true, useUnifiedTopology: true });

const postSchema = new mongoose.Schema({
    title: String,
    content: String
});

const Post = mongoose.model("Post", postSchema);


const posts = [];

app.get('/', function(req, res) {
    res.render('home', { posts: posts })
});

app.get('/about', function(req, res) {
    res.render('about')
})

app.get('/contact', function(req, res) {
    res.render('contact')
})

app.get('/addPost', function(req, res) {
    res.render('addPost')
})

app.post('/addPost', function(req, res) {
    let postTitle = req.body.postTitle;
    let postBody = req.body.postBody;

    const post = new Post({
        title: postTitle,
        content: postBody
    });

    post.save();
    res.redirect('/');
})

app.get('/post/:postName', function(req, res) {
    let postName = _.lowerCase(req.params.postName);

    posts.forEach(post => {
        let postTitle = _.lowerCase(post.title);
        if (postTitle === postName) {
            console.log('Ok');
            res.render('post', { postTitle: post.title, postContent: post.content })
        }

    });

});




app.listen(3000, function() {
    console.log('Server is running on post 3000')
})