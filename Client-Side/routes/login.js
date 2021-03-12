var express = require('express');

var router = express.Router();
var sess
const PermissionDal = require("../Dal/PermmisionDAL")
const UserBL = require("../BL/UserBL")
const UsersDal = require("../Dal/UserDAL")
/* GET home page. */
router.get('/', async function (req, res, next) {
    res.render("login", {})
});
router.post('/', async function (req, res, next) {
    sess = req.session;
    let PermissionDalJsonResp = await PermissionDal.GetTheJsonPermissions()
    let PermissionDalJsonData = PermissionDalJsonResp.Users
    let UsersJsonresp = await UsersDal.GetTheJsonUsers()
    let UsersJsonData = await UsersJsonresp.Users
    let resp = await UserBL.AllUsersDB()
    const validation = resp.find(each => each.UserName === req.body.UserName && each.Password === req.body.Password)
    if (validation) {

        const Permission = PermissionDalJsonData.find(per => per.id == validation._id)
        const GetTheSession = UsersJsonData.find(user => user.id == validation._id)

        sess.id = validation._id;
        sess.Session = GetTheSession.SessionTimeOut
        sess.UserName = validation.UserName;
        sess.Persmissions = Permission.Subscriptions
        if (resp.findIndex(e => e._id == validation._id) == 0) {
            sess.access = "Admin"
        }
        else {
            sess.access = "User"
        }
        res.redirect("/Main")
    }
    else {
        const html = `<html><body><h1>failed</h1></body></html>`;
        return res.send(html);

    }


});
router.get('/CreateAccount', async function (req, res, next) {
    res.render("createaccount", {})
});
router.post('/GetInfoCreateAccount', async function (req, res, next) {

    let resp = await UserBL.HandleCreateUser(req.body)
    res.redirect("/")
});
module.exports = router;
