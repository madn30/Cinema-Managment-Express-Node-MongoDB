const axios = require("axios")
const GetMembers = function()
{
return axios.get("https://jsonplaceholder.typicode.com/users")
}

module.exports  =  {GetMembers}