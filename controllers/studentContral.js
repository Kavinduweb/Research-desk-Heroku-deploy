const Studnet = require('../models/studentModel');
const brcypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const sendactivemail = require('../Mails/sendactivation'); 


const stdCtrl = {

    register: async (req,res)=>{
        try{
        const {studentNumber,name, email,password} = req.body
    

        const passwordHash = await brcypt.hash(password, 12)
       

        const newStudent ={
            studentNumber,name, email, password:passwordHash
        }
        const activetocken = createActivationToken(newStudent);
        const url=`${"http://localhost:3000"}/student/active/${activetocken}`
        console.log(activetocken)
        sendactivemail(email,url);
              res.json({msg:"Reg test"})
        }catch(err){
           return res.status(500).json({msg:err.message});

        }

    },
    activemail: async (req,res)=>{
        try{
            const {activetocken} = req.body;
            const student = jwt.verify(activetocken,process.env.ACTIVATION_TOKEN_SECRET)
            
        const {studentNumber,name, email,password} = student
          const check = await Studnet.findOne({email})
          if(check) return res.status(400).json({msg: "Email already existes"})
        

        const newStd = new Studnet({
            studentNumber,name, email,password
        })
        
        console.log(newStd);
        await newStd.save();
        res.json({msg: "account has been activated suucess"});

        }catch(err){
                res.json(err.message);
                
        }

    } ,
      login: async (req, res) => {
        try {
          const {studentNumber, password} = req.body
          const std = await Studnet.findOne({studentNumber})
          if (!std) return res.status(400).json({msg: "You Are not regiter"})

          const isMatch = await brcypt.compare(password, std.password)
          if (!isMatch) return res.status(400).json({msg: "Password is incorrect"})

            
          const refresh_token = createRefreshToken({id: std._id})
          res.cookie('refresgtoken', refresh_token, {
            httpOnly: true,
            path: '/student/access',
            maxAge: 1000 * 60 * 60 * 24 * 7
          })
          
          res.json({msg: "login suucess"})
         

        } catch (err) {
        return res.status(500).json({msg: err.message}) 
        }
    },
    getAccessToken:(req, res) => {
        try {
          const rf_token = req.cookies.refresgtoken
          if(!rf_token) return res.status(400).json({msg: "please login no1w"})
  
          jwt.verify(rf_token, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
              if(err) return res.status(400).json({msg: "please login now"})
              const access_token = createAccessToken({id: user.id})
              res.json({access_token})

              console.log(user)
              console.log(access_token)
  
          })
  
  
        }catch(err){
          return res.status(500).json({msg: err.message})
        }
  
      },
    getuserinfo:async (req,res)=>{

        try {
            const user = await Studnet.findById(req.user.id).select('-password')
            
            res.json(user);
        } catch (err) {
            return res.status(500).json({msg:err.message});
        }

    },
    getAllSTD: async (req, res) => {

      try{
        const users = await Studnet.find().select('-password')
        res.json(users)


      }catch (err){
        return res.status(500).json({msg: err.message})
      }
    },
    updateSTD: async (req, res) => {
      try{
        const {studentNumber, name,email} = req.body
        await Studnet.findOneAndUpdate({_id:req.user.id}, {
          studentNumber,name, email
        })
        res.json({msg: "update suucess"})
  
      }catch (err){
        return res.status(500).json({msg: err.message})
      }
      }

}
const createActivationToken = (payload) => {
    return jwt.sign(payload, process.env.ACTIVATION_TOKEN_SECRET,{ expiresIn: '5m' });
  }
  const createAccessToken = (payload) => {
    return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET,{ expiresIn: '15m' });
  }
  const createRefreshToken = (payload) => {
    return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET,{ expiresIn: '7d' });
  }

module.exports=stdCtrl;