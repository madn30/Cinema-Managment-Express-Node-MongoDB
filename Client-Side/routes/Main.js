var express = require('express');
const app = require('../app');
var router = express.Router();
const sessionn = require("../BL/SessionTimeOut")
/* GET home page. */
router.get('/', function (req, res, next) {

    res.render("main", { username: req.session.UserName, access: req.session.access })

});

module.exports = router;
