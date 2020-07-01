const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
var _ = require('lodash');
const { forEach } = require('lodash');


const app = express();

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");

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

    let post = {
        title: postTitle,
        content: postBody
    }

    posts.push(post);
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