var express = require('express');
var router = express.Router();
const UserDal = require("../Dal/UserDAL")
const UserBL = require("../BL/UserBL")
/* GET home page. */
router.get('/', async function (req, res, next) {

  let DBandJSONdata = await UserBL.AllUsersJsonAndDB();

  // let OnlyUsers=JsonUsersData.Users
  res.render('user_management', { DBandJSONdata,username:req.session.UserName });
});

module.exports = router;
