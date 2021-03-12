var express = require('express');
var router = express.Router();
const UserBL = require("../BL/UserBL")
const permissionBL = require("../BL/PermissionsBL")
/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('adduser', {});
});
router.post('/Info', async function (req, res, next) {
  if (!Array.isArray(req.body.Subscriptions)) {
    let Subscriptions = []
    Subscriptions.push(req.body.Subscriptions)
    req.body.Subscriptions = Subscriptions;
  }
  const IdCurrentUser = await UserBL.PostUserDB(req.body)
  const resp = await UserBL.BeforePostUserJsonFile(req.body, IdCurrentUser)
  res.redirect('/Main');
});

router.get('/Edit/:id', async function (req, res, next) {
  let userJsondata = await UserBL.GetUserJsonByID(req.params.id)
  let permissionJsondata = await permissionBL.GetThePermissionById(req.params.id)
  let UserDBdata = await UserBL.GetUserDBByID(req.params.id)
  res.render('edit', { userJsondata, permissionJsondata, UserDBdata });
});
router.get('/delete/:id', async function (req, res, next) {
  let userJsondata = await UserBL.DeleteUserJsonByID(req.params.id)
  let permissionJsondata = await permissionBL.DeletePermissionJson(req.params.id)
  let UserDBdata = await UserBL.DeleteUserDBByID(req.params.id)
  res.redirect("/")
});
router.post('/Edit', async function (req, res, next) {
  await UserBL.UpdateUserJsonByID(req.body)
  await permissionBL.UpdateUserJsonByID(req.body)
  await UserBL.updateUserDB(req.body.id, req.body)
  res.render('user_management', {});
});

module.exports = router;
