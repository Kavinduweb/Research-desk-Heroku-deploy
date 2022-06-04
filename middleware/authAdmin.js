const Users = require('../models/userModels')

const authAdmin = async (req, res, next) => {
    try{
const user = await Users.findOne({_id: req.user.id})

        if(user.role !==1)
        return res.status(401).json({msg: "admin access denied"})

        next()

    }catch(err){
        return res.status(500).json({msg: err.message});

    }

}

module.exports = authAdmin