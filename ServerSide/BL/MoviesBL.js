let MoviesDAL = require("../Dal/MoviesDal");
const MoviesModel = require("../Model/MoviesModel");
const moment = require("moment")

const addMovies = async function () {

    let resp = await MoviesDAL.GetMovies();
    let data = resp.data
    data.splice(50)
    let all = await getAllMovies()
    if (all.length === 0) {
        return new Promise((resolve, reject) => {
            data.forEach(movie => {
                const p = new MoviesModel({

                    Name: movie.name,
                    Genres: movie.genres,
                    Image: movie.image.medium,
                    Premiered: movie.premiered,
                    Genres: movie.genres
                });
                if (p) {
                    p.save(function (err) {
                        if (err) {
                            console.log("err");
                            reject(err);
                        }
                        else {

                            resolve('Created');
                        }
                    })
                }
                else {
                    console.log("full")
                }
            })
        });
    }
}
const addMovie = async function (movie) {

    return new Promise((resolve, reject) => {

        const p = new MoviesModel({
            Name: movie.Name,
            Genres: movie.Genres,
            Image: movie.Image,
            Premiered: movie.Premiered
        });

        p.save(function (err) {
            if (err) {
                console.log("err");
                reject(err);
            }
            else {

                resolve('Created');
            }
        })

    });

}

const getAllMovies = function () {
    return new Promise((resolve, reject) => {
        MoviesModel.find({}, function (err, movie) {
            if (err) {
                reject(err);
            }
            else {
                resolve(movie);
            }
        })
    })
}

const getMovie = function (id) {
    return new Promise((resolve, reject) => {
        MoviesModel.findById(id, function (err, movie) {
            if (err) {
                reject(err);
            }
            else {
                resolve(movie);
            }
        })
    })
}
const updateMovie = function (id, movie) {
    return new Promise((resolve, reject) => {
        MoviesModel.findByIdAndUpdate(id,
            {
                Genres: movie.Genres,
                Name: movie.Name,
                Image: movie.Image,
                Premiered: movie.Premiered
            }, function (err) {
                if (err) {
                    reject(err);
                }
                else {
                    resolve('Updated');
                }
            })
    })
}

const deleteMovie = function (id) {
    return new Promise((resolve, reject) => {
        MoviesModel.findByIdAndDelete(id, function (err) {
            if (err) {
                reject(err);
            }
            else {
                resolve('Deleted');
            }
        })
    })
}
module.exports = { addMovies, getAllMovies, updateMovie, deleteMovie, getMovie, addMovie }