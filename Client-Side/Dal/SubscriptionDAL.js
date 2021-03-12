let axios = require("axios")
const AllSubscriptions = function () {
    return (
        axios.get("http://localhost:8000/api/Subscription/")
    )
}
const GetSubscriptionByID= function(id){
    return (
        axios.get ("http://localhost:8000/api/Subscription/"+id)
    )
}
const PutSubscriptionByID=async function(id,body){

       await axios.put ("http://localhost:8000/api/Subscription/"+id,body)
       return "success"
    
}
const PostSubscription=async function(body){

    await axios.post ("http://localhost:8000/api/Subscription",body)
    return "success"
 
}
module.exports={AllSubscriptions,GetSubscriptionByID,PutSubscriptionByID,PostSubscription}