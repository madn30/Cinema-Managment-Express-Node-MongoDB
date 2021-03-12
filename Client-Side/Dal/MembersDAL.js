let axios = require("axios")
const AllMembers = function () {
    return (
        axios.get("http://localhost:8000/api/member")
    )
}
const GetMemberById = function(id)
{
return axios.get("http://localhost:8000/api/Member/"+id)
}
const PostMember=async function(body){

    await axios.post ("http://localhost:8000/api/Member/",body)
    return "success"
 
}
const PutMemberByID=async function(id,body){

    await axios.put ("http://localhost:8000/api/Member/"+id,body)
    return "success"
 
}
module.exports={AllMembers,GetMemberById,PostMember,PutMemberByID}