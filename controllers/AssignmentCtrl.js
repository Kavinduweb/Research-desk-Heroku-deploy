const cloudinary = require('cloudinary')
const fs = require('fs')




cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
})




const AssignmentCtrl = {
    assignment: async (req, res) => {
        try{
            const {name, description, rules, author, file} = req.body
            
            if (!name || !description || !rules || !author || !file)
            return res.status(400).json({msg: "Please fill all fields"})


            

        const newUser = {
            name,description, rules, author, file
        }
       

        await newUser.save()

        res.json({msg: "account has been activated suucess"});


    
        } catch(err){
            return res.status(500).json({msg: err.message});
        }


    },
        uploadFile: (req, res) => {
            try{
                
                const file = req.files.file;

                cloudinary.v2.uploader.upload(file.tempFilePath, {
                    folder: 'assignment', width: '150', height: '150', crop: 'fill'


                }, async(err, result) => {
                    if (err) throw err;
                    removeTmp(file.tempFilePath)


                    console.log({result})

                    res.json({url: result.secure_url})


                })


            }catch(err){
                return res.status(500).json({msg: err.message})
            }

        }
        



}

const removeTmp = (path) => {
    fs.unlink(path, (err) => {
        if (err) throw err
    })
}

module.exports = AssignmentCtrl