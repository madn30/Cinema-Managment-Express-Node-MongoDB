const SubscriptionModel = require("../Model/SubscriptionModel");
const addSubscription = async function (subscription) {

    return new Promise((resolve, reject) => {

        const p = new SubscriptionModel({
            MemberId: subscription.idmember,
            Movies: [{

                movieId: subscription.Movie,
                Time: subscription.date
            }
            ]
        });

        p.save(function (err) {
            console.log(p);
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

const getAllSubscriptions = function () {
    return new Promise((resolve, reject) => {
        SubscriptionModel.find({}, function (err, subscri) {
            if (err) {
                reject(err);
            }
            else {
                resolve(subscri);
            }
        })
    })
}

const getSubscription = function (id) {
    return new Promise((resolve, reject) => {
        SubscriptionModel.findById(id, function (err, subscri) {
            if (err) {
                reject(err);
            }
            else {
                resolve(subscri);
            }
        })
    })
}
const updateSubscription = function (id, subscription) {
    return new Promise((resolve, reject) => {
        SubscriptionModel.findByIdAndUpdate(id,
            {
                MemberId: subscription.MemberId,
                Movies: [{
                    movieId: subscription.Movies[0].movieId,
                    Time: subscription.Movies[0].Time
                }
                ]
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

const deleteSubscription = function (id) {
    return new Promise((resolve, reject) => {
        SubscriptionModel.findByIdAndDelete(id, function (err) {
            if (err) {
                reject(err);
            }
            else {
                resolve('Deleted');
            }
        })
    })
}
module.exports = { addSubscription, getAllSubscriptions, getSubscription, updateSubscription, deleteSubscription }