var express = require('express');
var router = express.Router();
var sess
/* GET home page. */
router.get('/', function (req, res, next) {
  sess = req.session;
  sess.cookie.expires = sess.Session * 100000
  if (sess.Session) {
    res.render("main", { username: req.session.UserName, access: req.session.access })
  }
  else {
    res.redirect("/")
  }
});
router.get('/Logout', function (req, res, next) {
  req.session.destroy();
  res.redirect("/")

});
module.exports = router;
