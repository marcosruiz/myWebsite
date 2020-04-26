var express = require('express');
var fs = require('fs');
var router = express.Router();

/* GET curriculum. */
router.get('/', function(req, res, next) {

  var data = fs.readFileSync('./public/pdfs/curriculum.pdf');
  res.contentType("application/pdf");
  res.send(data);

});

module.exports = router;
