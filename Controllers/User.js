const User = require('../Models/userModel');
const { v4 : uuidv4 } = require('uuid');
const {setUser,getUser} = require('../services/Auth');
async function handleUserSignup(req,res){
    const {name,email,password} = req.body;
    const user = await User.create({
        name,
        email,
        password
    })
    return res.render('login');
}
async function handleUserLogin(req,res){
    const {email,password} = req.body;
    const user = await User.findOne({email,password});
    if(!user)
        return res.render("login",{
            error : "User not found"
        })
   
   
    const token = setUser(user);
    res.cookie('token',token);
    return res.redirect('/');
}

module.exports={
    handleUserSignup,
    handleUserLogin
}