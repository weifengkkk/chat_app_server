const User =  require("../model/UserModel")
const brcypt = require('bcrypt');
const { json } = require("express");
module.exports.register = async (req,res,next) => {
   try{
        const {username,password,avatarImage} = req.body;

        const usernameCheck = await User.findOne({username})
        if(usernameCheck) return res.json({msg:"userName have already used",status:false})
        const hashedPassword = await brcypt.hash(password,10);
        const user = await User.create({
            username,
            hashedPassword,
            password: hashedPassword,
        })
        delete user.password
        return res.json({status:true,user})
   }catch(ex){
    next(ex)
   }
}

module.exports.login = async (req, res, next )=> {
    try{
        const { username, password } = req.body;
        const user = await User.findOne({username})
        if(!user) return res.json({msg: 'incorrect username or password',status:false})
        const isPasswordValid = await brcypt.compare(password,user.password)
        if(!isPasswordValid){
            return res.json({msg: 'Incorrect username or password',status:false })
        }
        delete user.password
        return res.json({status:true,user})
    }catch(ex){
        next(ex)
    }
}

module.exports.setAvatar = async (req, res, next ) => {
    try{
        const {username, isAvatarImageSet, avatarImage} = req.body;
     
        if(isAvatarImageSet){
            const result = await User.findOneAndUpdate({username},{isAvatarImageSet,avatarImage})
            result.isAvatarImageSet = isAvatarImageSet
            result.avatarImage = avatarImage
            return res.json({status:true, result})
        }else{
            return res.json({status:false})
        }
    }catch(ex){
        next(ex)
    }
}


module.exports.getAllUsers = async (req, res, next) => {
    try{
        const users = await User.find({_id:{$ne: req.params.id}}).select([
            "username","avatarImage","_id"
        ])
        return res.json(users)
    }catch(ex){
        next(ex)
    }
}

 