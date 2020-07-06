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



app.get('/', function(req, res) {

    Post.find({}, function(err, posts) {
        res.render('home', { posts: posts })

    })

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

    post.save(function(err) {
        if (!err) {
            res.redirect('/');
        }
    });

})

app.get('/post/:postId', function(req, res) {
    let postId = req.params.postId;
    Post.findById(postId, function(err, posts) {
        if (!err) {
            res.render('post', {
                postTitle: posts.title,
                postContent: posts.content
            })
        }
    })

})





app.listen(3000, function() {
    console.log('Server is running on post 3000')
})