let SubscriptionDAL = require("../Dal/SubscriptionDAL")
const HandleMoviesInSubscription = async function (Movies) {

    let resp = await SubscriptionDAL.AllSubscriptions()
    let subscriptiondata = resp.data
    let CompiledMovieAndSubscribe = subscriptiondata.map(function (subscribe) {
       
        let DataShape = {}
        Movies.forEach(movie => {
            if (movie.id == subscribe.Movies[0].movieId) {
                 DataShape = {SubscriptionId :subscribe._id, MovieId:movie.id,MovieName:movie.Name,SubscriptionTime:subscribe.Movies[0].Time,MemberId:subscribe.MemberId}

              

             }
        })
        return DataShape
    })
   return CompiledMovieAndSubscribe

}
module.exports = { HandleMoviesInSubscription }