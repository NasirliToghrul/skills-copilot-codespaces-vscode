// Create web server

var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var db = require('../models');
var Comment = db.Comment;
var Post = db.Post;
var User = db.User;

// When user post comment
router.post('/post', function(req, res) {
    var post_id = req.body.post_id;
    var user_id = req.body.user_id;
    var content = req.body.content;
    var comment = {
        post_id: post_id,
        user_id: user_id,
        content: content
    };
    Comment.create(comment).then(function() {
        res.redirect('/post/' + post_id);
    });
});

// When user delete comment
router.post('/delete', function(req, res) {
    var id = req.body.id;
    var post_id = req.body.post_id;
    Comment.destroy({
        where: {
            id: id
        }
    }).then(function() {
        res.redirect('/post/' + post_id);
    });
});

module.exports = router;