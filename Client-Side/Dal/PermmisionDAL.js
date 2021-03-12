const jsonfile = require('jsonfile');

const writeToPermissionsJsonFile = function (obj,id) {
    return new Promise((resolve, reject) => {
        jsonfile.writeFile("./JSON/Permissions.json", obj, function (err) {
            if (err) {
                reject(err);
            }
            else {
                resolve('Created!')
            }
        })
    });

}
const GetTheJsonPermissions= function () {
    
    return new Promise((resolve, reject) => {
        jsonfile.readFile('./JSON/Permissions.json', function (err, data) {
            if (err) {
                reject(err)
            }
            else {
                resolve(data);
            }
        })
    })


}
module.exports={writeToPermissionsJsonFile,GetTheJsonPermissions}