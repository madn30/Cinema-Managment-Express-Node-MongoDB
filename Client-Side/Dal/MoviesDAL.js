let axios = require("axios")
const AllMovies = function () {
    return (
        axios.get("http://localhost:8000/api/movies")
    )
}
const GetMovieByID= function(id){
    return (
        axios.get ("http://localhost:8000/api/movies/"+id)
    )
}
const PutMovieByID=async function(id,body){

       await axios.put ("http://localhost:8000/api/movies/"+id,body)
       return "success"
    
}
const PostMovie=async function(body){

    await axios.post ("http://localhost:8000/api/movies",body)
    return "success"
 
}
module.exports={AllMovies,GetMovieByID,PutMovieByID,PostMovie}