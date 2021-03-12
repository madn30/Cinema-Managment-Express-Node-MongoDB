let MembersDAL = require("../Dal/MembersDal");
const MembersModel = require("../Model/MembersModel");

const addMembers = async function () {
    let resp = await MembersDAL.GetMembers();
    let data = resp.data
    let resp1 = await getAllMembers()
    
    if (resp1.length === 0) {
        return new Promise((resolve, reject) => {
            data.forEach(member => {

                const M = new MembersModel({
                    Name: member.name,
                    Email: member.email,
                    City: member.address.city
                });

                M.save(function (err) {
                    if (err) {
                        console.log("err");
                        reject(err);
                    }
                    else {

                        resolve('Created');
                    }
                })
            })
        });
    }
}
const getAllMembers = function () {
    return new Promise((resolve, reject) => {
        MembersModel.find({}, function (err, member) {
            if (err) {
                reject(err);
            }
            else {
                resolve(member);
            }
        })
    })
}
const addMember = async function (member) {


    return new Promise((resolve, reject) => {


        const M = new MembersModel({
            Name: member.Name,
            Email: member.Email,
            City: member.City
        });

        M.save(function (err) {
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

const getMember = function (id) {
    return new Promise((resolve, reject) => {
        MembersModel.findById(id, function (err, member) {
            if (err) {
                reject(err);
            }
            else {
                resolve(member);
            }
        })
    })
}
const updateMember = function (id, member) {
    return new Promise((resolve, reject) => {
        MembersModel.findByIdAndUpdate(id,
            {
                Name: member.Name,
                Email: member.Email,
                City: member.City
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

const deleteMember = function (id) {
    return new Promise((resolve, reject) => {
        MembersModel.findByIdAndDelete(id, function (err) {
            if (err) {
                reject(err);
            }
            else {
                resolve('Deleted');
            }
        })
    })
}
module.exports = { addMembers, deleteMember, updateMember, getMember, getAllMembers, addMember }