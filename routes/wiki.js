var express = require('express');
var router = express.Router();

var models = require('../models');
var Page = models.Page;
var User = models.User;

// could use one line instead: const router = require('express').Router();

console.log('In wiki route!')

router.get('/', function(req, res, next) {
    res.redirect('/');
});

router.post('/', function(req, res, next) {
    const newPageObj = res.json(req.body);

    var page = Page.build({
        title: newPageObj.title,
        content: newPageObj.content,
    });

    //TODO collect authorName and emailField
    //if new User create user else add to
    // newPageObj = {"authorName":"asdfa","emailField":"","title":"sdfa","content":"","page-status":"fas"}

    page.save().then(() => res.redirect('/')); //ES2016 syntax

    // page.save().then(function() {
    //     res.redirect('/');
    // });

    // console.log(page.save());
});

router.get('/add', function(req, res, next) {
    res.render('addpage');
});



module.exports = router;
