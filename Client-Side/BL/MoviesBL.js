let SubscriptionDAL = require("../Dal/SubscriptionDAL")
let MemberDal = require("../Dal/MembersDAL")
let MoviesDal = require("../Dal/MoviesDAL");

const HandleMoviesInSubscription = async function (Movies) {

    let respsubscription = await SubscriptionDAL.AllSubscriptions();
    let subscriptiondata = respsubscription.data;
    let find = await Promise.all(subscriptiondata.map(async sub => {

        let MemberResp = await MemberDal.GetMemberById(sub.MemberId)
        let MemberData = MemberResp.data;
        let MovieResp = await MoviesDal.GetMovieByID(sub.Movies[0].movieId)
        let MovieData = MovieResp.data
        return { "Members": MemberData, "Movies": MovieData, "Subscription": sub }


    }))
    return find

}
const HandleSearch = async function (data) {

    let newSearcharray = []
    let Movieresp = await MoviesDal.AllMovies()
    let MovieData = Movieresp.data
    MovieData.forEach(movie => {
        if (movie.Name.toLowerCase().includes(data.toLowerCase())) {
            newSearcharray.push(movie);
        }
    })
    return newSearcharray


}
module.exports = { HandleMoviesInSubscription, HandleSearch }