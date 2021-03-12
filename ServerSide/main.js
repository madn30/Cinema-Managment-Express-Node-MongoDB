const express = require('express');
//const personsRouter = require('./Routers/personRouter');
const MoviesRouter = require("./Router/Movies")
const MembersRouter = require("./Router/Members")
const SubscriptionRouter = require("./Router/Subscription")

var app = express();
var cors = require('cors')

var MoviesBL = require("./BL/MoviesBL")
var MemberBL = require("./BL/MembersBL")

require('./Configs/database');
MoviesBL.addMovies()
MemberBL.addMembers()
app.use(cors())

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//app.use('/api/persons', personsRouter);
app.use("/api/Movies", MoviesRouter)
app.use("/api/Member", MembersRouter)
app.use("/api/Subscription", SubscriptionRouter)

app.listen(8000);
console.log("hello");