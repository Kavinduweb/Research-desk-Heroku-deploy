const Users = require('../models/userModels')
const brcypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const sendMail = require('./sendMail')
const sendEmail = require('./sendMail')

const {CLIENT_URL} = process.env




const userCtrl = {
    register: async (req, res) => {
        try{
            const {name, email, password, role, job} = req.body
            
            if (!name || !email || !password || !role || !job)
            return res.status(400).json({msg: "Please fill all fields"})

            if(!validateEmail(email))
            return res.status(400).json({msg: "Invalid Emial"})

            const user = await Users.findOne({email})
            if(user)  return res.status(400).json({msg: "Email already exists"})

            if (password.length < 6 )
            return res.status(400).json({msg: "Password must be atleast 6 characters"})

            const passwordHash = await brcypt.hash(password, 12)
        console.log({password, passwordHash})

        const newUser = {
            name,email, role,job, password:passwordHash
        }

            const activation_token = createActivationToken(newUser)
            console.log({activation_token})

            
            const url = `${CLIENT_URL}/user/activate/${activation_token}`
           
            sendMail(email, url, "Verify your email")


            res.json({msg: "Staff Registration Success. Avtivate your account by email"});
        } catch(err){
            return res.status(500).json({msg: err.message});
        }


    },
    activateEmail: async (req, res) => {
      try{
        const {activation_token} = req.body
        const user = jwt.verify(activation_token,process.env.ACTIVATION_TOKEN_SECRET)
        
        const {name,email,password,role,job} = user
        const check = await Users.findOne({email})

        if(check) return res.status(400).json({msg: "Email already exists"})

        const newUser = new Users({
          name,email,password,role,job
        })

        await newUser.save()
        res.json({msg: "Account has been Activated Successfully, PLease Login "});


      } catch(err){
        return res.status(500).json({msg: err.message})
      }
    },
    login: async (req, res) => {
        try {
          const {email, password} = req.body
          const user = await Users.findOne({email})
          if (!user) return res.status(400).json({msg: "Email Doesn't Exist "})

          const isMatch = await brcypt.compare(password, user.password)
          if (!isMatch) return res.status(400).json({msg: "Password is Incorrect"})

 
          const refresh_token = createRefreshToken({id: user._id})
          res.cookie('refresgtoken', refresh_token, {
            httpOnly: true,
            path: '/user/refresh_token',
            maxAge: 1000 * 60 * 60 * 24 * 7
          })

          res.json({msg: "Login Successfully"})


        } catch (err) {
        return res.status(500).json({msg: err.message}) 
        }
    },
    getAccessToken:(req, res) => {
      try {
        const rf_token = req.cookies.refresgtoken
        if(!rf_token) return res.status(400).json({msg: "please login now"})

        jwt.verify(rf_token, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
            if(err) return res.status(400).json({msg: "please login now"})
            const access_token = createAccessToken({id: user.id})
            res.json({access_token})

            console.log(user)


        })


      }catch(err){
        return res.status(500).json({msg: err.message})
      }

    },
    fogetPassword: async (req, res) => {
      try{
        const {email} = req.body
        const user = await Users.findOne({email})
        if(!user) return res.status(400).json({msg: "Email not exist"})

        const access_token = createAccessToken({id: user._id})
        const url = `${CLIENT_URL}/user/reset/${access_token}`

        sendEmail(email, url , "rest your password")
        res.json({msg: "Check your Email to Reset the Password"})


      }catch (err){
        return res.status(500).json({msg: err.message})
      }
    },
    resetPassword: async (req, res) => {

      try{
        const {password} = req.body
        console.log(password)
        const passwordHash = await brcypt.hash(password, 12)

        console.log(req.user)
        await Users.findByIdAndUpdate({_id:req.user.id}, {
          
          password:passwordHash
          })

          res.json({msg: "Password has been Reset Successfully"})




      }catch (err){ 
        return res.status(500).json({msg: err.message})
      }
    },
    getUserInfor: async (req, res) => {
      try{
        const user = await Users.findById(req.user.id).select('-password')
        res.json(user)

      }catch (err){
        return res.status(500).json({msg: err.message})
      }


    },
    getUserAllInfor: async (req, res) => {

      try{
        const users = await Users.find().select('-password')
        res.json(users)


      }catch (err){
        return res.status(500).json({msg: err.message})
      }
    },


    logout: async (req, res) => {
      try{
        res.clearCookie('refresgtoken', {path : '/user/refresh_token'})
        return res.json({msg: "Logout Successfully"})


      }catch (err){
        return res.status(500).json({msg: err.message})
      }
    },
    updateUser: async (req, res) => {
    try{
      const {name, avatar,job} = req.body
      await Users.findOneAndUpdate({_id:req.user.id}, {
        name, avatar, job
      })
      res.json({msg: "User Details Updated Successfully"})

    }catch (err){
      return res.status(500).json({msg: err.message})
    }
    },
    updateUserRole: async (req, res) => {
      try{
        const {role} = req.body
        await Users.findOneAndUpdate({_id:req.params.id}, {
          role
        })
        res.json({msg: "User Role Update Successfully"})
  
      }catch (err){
        return res.status(500).json({msg: err.message})
      }


    },
    updatePanelRole: async (req, res) => {
      try{
        const {roledesc} = req.body
        await Users.findOneAndUpdate({_id:req.params.id}, {
          roledesc
        })
        res.json({msg: "Panel Member Updated Successfully"})
  
      }catch (err){
        return res.status(500).json({msg: err.message})
      }


    },
    deleteUser: async (req, res) => {
      {
        try{
          await Users.findByIdAndDelete(req.params.id)
          res.json({msg: "User Account Deleted Successfully"})

        }catch (err){
          return res.status(500).json({msg: err.message})
        }
      }
    },
    getSupInfo: async (req, res) => {
      try{
        const user = await Users.findById(req.user.id).select('-password')
        res.json(user)

      }catch (err){
        return res.status(500).json({msg: err.message})
      }


    },

    getUserAllData: async (req, res) => {

      try{
        const users = await Users.find().select('-password')
        res.json(users)


      }catch (err){
        return res.status(500).json({msg: err.message})
      }
    },
    


    
    
    



}








const validateEmail = (email) => {
    return email.match(
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
  };

  const createActivationToken = (payload) => {
    return jwt.sign(payload, process.env.ACTIVATION_TOKEN_SECRET,{ expiresIn: '5m' });
  }
  const createAccessToken = (payload) => {
    return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET,{ expiresIn: '15m' });
  }
  const createRefreshToken = (payload) => {
    return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET,{ expiresIn: '7d' });
  }

module.exports = userCtrl;