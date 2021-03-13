var express = require('express');
var router = express.Router();
const MembersDal = require("../Dal/MembersDAL")
const MoviesDal = require("../Dal/MoviesDAL")
const SubscriptionDal = require("../Dal/SubscriptionDAL")
const SubscriptionBL = require("../BL/SubscriptionBL")

var moment = require('moment');

/* GET home page. */
router.get('/', async function (req, res, next) {
  let respMembers = await MembersDal.AllMembers()
  let MemberData = respMembers.data
  let respMovies = await MoviesDal.AllMovies()
  let dataMovies = respMovies.data;
  let MoviesData = dataMovies.map(e => { return { Name: e.Name, id: e._id } })
  let SubsInMovie = await SubscriptionBL.HandleMoviesInSubscription(MoviesData)
  res.render('members', { MemberData, MoviesData, SubsInMovie, moment, username: req.session.UserName, Persmissions: req.session.Persmissions });
});


router.post('/GetTheMovieSub', async function (req, res, next) {
  await SubscriptionDal.PostSubscription(req.body)
  res.redirect("/Members")
});

router.get('/EditMember/:id', async function (req, res, next) {

  let subscribe = await MembersDal.GetMemberById(req.params.id)
  let data = subscribe.data
  res.render("editmember", { data, username: req.session.UserName })
});
router.post('/EditMember', async function (req, res, next) {
  let resp = await MembersDal.PutMemberByID(req.body.id, req.body)
  res.redirect("/Members")
});

router.get('/AddMember', async function (req, res, next) {

  res.render("addmember", { username: req.session.UserName })
});
router.post('/AddMember', async function (req, res, next) {
  let resp = await MembersDal.PostMember(req.body)
  if (resp === "success")
    res.redirect("/Members")
});
router.get('/Member/:id', async function (req, res, next) {

  let find = await MembersDal.GetMemberById(req.params.id)
  let finddata = find.data
  res.render("member", { finddata, moment })
});

module.exports = router;
