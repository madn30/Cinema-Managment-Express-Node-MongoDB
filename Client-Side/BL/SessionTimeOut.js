
exports.session = function (sessionTimeOut) {
    return new Promise((resolve) => {
        if (sessionTimeOut) {
            setTimeout(function () {
                resolve("done")
            }, 3000);
        }
   
    })
}