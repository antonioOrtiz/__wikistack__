var express = require('express');
var router = express.Router();
var wikiRoute = require('./wiki');
var userRoute = require('./user');

// could use one line instead: const router = require('express').Router();
console.log('In index');
router.use('/wiki', wikiRoute);
router.use('/user', userRoute);





module.exports = router;
