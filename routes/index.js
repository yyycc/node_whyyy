var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  // res.render('index', { title: 'Express' });
  res.json({
    users: [
        "/",
        "/queryById",
        "/query",
        "/queryAll",
        "/deleteById",
        "/deleteByIds",
    ],
    blog: [
      "/",
      "/queryById",
      "/query",
      "/queryAll",
      "/deleteById",
      "/deleteByIds",
    ]
  });
});

module.exports = router;
