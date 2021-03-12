const jsonfile = require('jsonfile');

const writeToUserJsonFile = function (obj,id) {
    return new Promise((resolve, reject) => {
        jsonfile.writeFile("./JSON/Users.json", obj, function (err) {
            if (err) {
                reject(err);
            }
            else {
                resolve('Created!')
            }
        })
    });

}
const GetTheJsonUsers = function () {
    console.log("inside");
    return new Promise((resolve, reject) => {
        jsonfile.readFile('./JSON/Users.json', function (err, data) {
            if (err) {
                reject(err)
            }
            else {
                resolve(data);
            }
        })
    })


}
module.exports={writeToUserJsonFile,GetTheJsonUsers}