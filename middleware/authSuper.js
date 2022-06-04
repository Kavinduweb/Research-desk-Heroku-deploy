const Users = require('../models/userModels')

const authSuper = async (req, res, next) => {
    try{
const user = await Users.findOne({_id: req.user.id})

        if(user.role !==2)
        return res.status(401).json({msg: "supervisor access denied"})

        next()

    }catch(err){
        return res.status(500).json({msg: err.message});

    }

}

module.exports = authSuper