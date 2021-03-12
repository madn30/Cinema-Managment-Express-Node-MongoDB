const PermissionsDAL = require("../Dal/PermmisionDAL")

const GetThePermissionById = async function (id) {
    let data = await PermissionsDAL.GetTheJsonPermissions()
    let Permission = data.Users.find(permission => permission.id == id)
    return Permission
}
const UpdateUserJsonByID = async function (obj) {
    let resp = await PermissionsDAL.GetTheJsonPermissions()
    let data = resp.Users
    let index = data.findIndex(user => user.id == obj.id)
    console.log(obj);
    data[index] = {
        id: obj.id,
        Subscriptions:obj.Subscriptions
    }
    let result = PermissionsDAL.writeToPermissionsJsonFile({ "Users": data })
    return result
}
const DeletePermissionJson=async function (id){
    let resp = await PermissionsDAL.GetTheJsonPermissions()
    let data = resp.Users
    let index = data.findIndex(user => user.id == id)
    data.splice(index,1)
    let result = PermissionsDAL.writeToPermissionsJsonFile({ "Users": data })
    return result
}
module.exports = { GetThePermissionById,UpdateUserJsonByID,DeletePermissionJson }