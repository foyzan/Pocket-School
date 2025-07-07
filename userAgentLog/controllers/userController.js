const Users = [
    {id : 1, name : "hira"},
    {id : 2 ,name : "alim"}
]

const getAllUser = (req, res)=>{

    res.json(Users)
}

const deleteUser =  (req, res)=>{

    res.send("user deleted")
}

module.exports = {
    getAllUser,
    deleteUser
}