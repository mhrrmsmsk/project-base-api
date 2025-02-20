var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('Tüm kullanıcılar burda ');
});

module.exports = router;
