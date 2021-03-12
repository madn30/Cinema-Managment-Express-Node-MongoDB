const axios = require("axios")
const GetMovies = function()
{
return axios.get("https://api.tvmaze.com/shows?page=0")
}


module.exports  =  {GetMovies}