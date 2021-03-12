const UserModel = require("../Model/UserModel")
const UserDAL = require("../Dal/UserDAL")
const PermissionsDAL = require("../Dal/PermmisionDAL")
const PermissionsBL = require("../BL/PermissionsBL")
const AllUsersDB = async function () {
    return new Promise((resolve, reject) => {

        UserModel.find({}, function (err, users) {
            if (err) {
                reject(err)
            }
            else {

                resolve(users)

            }
        })

    });

}
const updateUserDB = async function (id, user) {
    let obj = await GetUserDBByID(id);
    return new Promise((resolve, reject) => {

        UserModel.findByIdAndUpdate(id,
            {
                UserName: user.UserName,
                Password: obj.Password?obj.Password:user.Password
            }, function (err, updated) {
                if (err) {
                    reject(err);
                }
                else {
                    console.log(updated);
                    resolve('Updated');
                }
            })
    })
}
const DeleteUserDBByID = async function (id, user) {
    return new Promise((resolve, reject) => {

        UserModel.findByIdAndDelete(id,function (err) {
                if (err) {
                    reject(err);
                }
                else {
                    resolve('Updated');
                }
            })
    })
}
const PostUserDB = async function (user) {
    let data = await UserDAL.GetTheJsonUsers()
    if (!data.Users.some(us => us.UserName == user.UserName)) {
        return new Promise((resolve, reject) => {
            const p = new UserModel({

                UserName: user.UserName,
                Password: ""
            });

            p.save(function (err) {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(p._id);
                }
            })
        })
    }
    else {
        console.log("UserName Already Exists");
        return false
    }
}
const GetUserDBByID = function (id) {


    return new Promise((resolve, reject) => {
        UserModel.findById(id, function (err, per) {
            if (err) {
                reject(err);
            }
            else {
                resolve(per);
            }
        })
    })


}
const GetUserJsonByID = async function (id) {
    let data = await UserDAL.GetTheJsonUsers()
    let user = data.Users.find(user => user.id == id)
    return user
}
const BeforePostUserJsonFile = async function (obj, id) {
    let today = new Date();
    let DataShapeUserJson = {
        id,
        FirstName: obj.FirstName,
        LastName: obj.LastName,
        CreatedDate: today.getFullYear() + '/' + (today.getMonth() + 1) + '/' + today.getDate(),
        SessionTimeOut: obj.SessionTimeOut,
    }

    let DataShapePermmisionJson = {
        id,
        Subscriptions: obj.Subscriptions,
    }
    const userjsondata = await UserDAL.GetTheJsonUsers();
    userjsondata.Users.push(DataShapeUserJson);
    const Permissionsjsondata = await PermissionsDAL.GetTheJsonPermissions();
    Permissionsjsondata.Users.push(DataShapePermmisionJson)
    await UserDAL.writeToUserJsonFile(userjsondata);
    await PermissionsDAL.writeToPermissionsJsonFile(Permissionsjsondata);
    return "Succeed"
}


const HandleCreateUser = async function (_User) {
    let alluser = await AllUsersDB()
    let UserNameMatch = alluser.find(user => user.UserName === _User.UserName)
    if (UserNameMatch) {
        let resp = await updateUserDB(UserNameMatch._id, _User)
    }
}

const AllUsersJsonAndDB = async function () {
    const newArrayData = []
    let alluserDB = await AllUsersDB()
    let allUsersjsondata = await UserDAL.GetTheJsonUsers();
    let data = await PermissionsDAL.GetTheJsonPermissions();
    allUsersjsondata.Users.forEach(async function (userjson, index) {

        alluserDB.forEach(async userdb => {

            if (index != 0 && userjson.id == userdb._id && userdb.Password != "") {
                let Permission = data.Users.find(e => e.id == userdb._id)

                let DataShape = {
                    id: userjson.id,
                    Name: userjson.FirstName,
                    UserName: userdb.UserName,
                    SessionTimeOut: userjson.SessionTimeOut,
                    Createddata: userjson.CreatedDate,
                    Permissions: Permission.Subscriptions
                }


                newArrayData.push(DataShape)
                // console.log(newArrayData);

            }

        })
    })

    return newArrayData

}
const UpdateUserJsonByID = async function (obj) {
    let resp = await UserDAL.GetTheJsonUsers()
    let data = resp.Users
    let index = data.findIndex(user => user.id == obj.id)
    data[index] = {
        id: obj.id,
        FirstName: obj.FirstName,
        LastName: obj.LastName,
        CreatedDate: obj.CreatedDate,
        SessionTimeOut: obj.SessionTimeOut,
    }
    let result = UserDAL.writeToUserJsonFile({ "Users": data })
    return result
}
const DeleteUserJsonByID =async function (id){
    let resp = await UserDAL.GetTheJsonUsers()
    let data = resp.Users
    let index = data.findIndex(user => user.id == id)
    data.splice(index,1)
    let result = UserDAL.writeToUserJsonFile({ "Users": data })
    return result
}

module.exports = { AllUsersDB,DeleteUserJsonByID, PostUserDB,DeleteUserDBByID, BeforePostUserJsonFile, HandleCreateUser, updateUserDB, AllUsersJsonAndDB, GetUserJsonByID, GetUserDBByID, UpdateUserJsonByID }