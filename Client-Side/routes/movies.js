var express = require('express');
var router = express.Router();
var moment = require('moment');
let MoviesDal = require("../Dal/MoviesDAL")
let MoviesBL = require("../BL/MoviesBL")
/* GET home page. */
router.get('/', async function (req, res, next) {
  const resp = await MoviesDal.AllMovies()
  let data = resp.data
  let response = await MoviesBL.HandleMoviesInSubscription()
  res.render('movies', { data, response, username: req.session.UserName, Persmissions: req.session.Persmissions });
});
router.post('/', async function (req, res, next) {

  let GetResultSearch = await MoviesBL.HandleSearch(req.body.search)
  let response = await MoviesBL.HandleMoviesInSubscription()

  res.render('movies', { data: GetResultSearch, response, username: req.session.UserName, Persmissions: req.session.Persmissions });
});
router.get('/editmovie/:id', async function (req, res, next) {
  const resp = await MoviesDal.GetMovieByID(req.params.id)
  let data = resp.data

  res.render('editmovie', { data, moment, username: req.session.UserName });
});
router.post('/editmovie', async function (req, res, next) {
  req.body.Genres = req.body.Genres.split(',');
  const resp = await MoviesDal.PutMovieByID(req.body.id, req.body)
  res.redirect("/Movies")

});
router.get('/addmovie', async function (req, res, next) {

  res.render('addmovie', { username: req.session.UserName });
});
router.post('/addmovie', async function (req, res, next) {
  req.body.Genres = req.body.Genres.split(",")
  const resp = await MoviesDal.PostMovie(req.body)
  res.redirect("/Movies")
});
router.get('/Movie/:id', async function (req, res, next) {
  let find = await MoviesDal.GetMovieByID(req.params.id)
  let finddata = find.data
  res.render('movie', { finddata, moment });
});
module.exports = router;
