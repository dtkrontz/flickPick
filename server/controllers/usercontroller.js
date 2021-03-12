const Express = require('express');
const router = Express.Router();
const {UserModel}= require('../models');//calling back to the userModel
const bcrypt = require('bcryptjs');
const jwt = require ('jsonwebtoken');
const { UniqueConstraintError } = require('sequelize/lib/errors');


//register
router.post('/register', async (req, res) => {
    let {username, password}= req.body.user;
    try{
        const User = await UserModel.create({
            username,
            password: bcrypt.hashSync(password,13)
        })
        const token = jwt.sign({
            id:User.id
        },
        process.env.JWT_SECRET,
        {expiresIn : 60*60*24});
        res.status(201).json({
            Message:'User was registered!',
            user: User,
            token
        })
    } catch (error) {
        if (error instanceof UniqueConstraintError){
            res.status(409).json({
                message:'Do you have a doppelganger? This username is already in use!'
            })
        }else{
            console.log(error)
            res.status(500).json({
                error: "Failed to register user"
            })
        }
    }
});

//login
router.post('/login', async(req, res) => {
    const {username, password} = req.body.user;
    try{
       let loginUser = await UserModel.findOne({
           where:{
               username
           }
       });

       if(loginUser) {
           let passwordComparison = await bcrypt.compare(password,loginUser.password);

           if(passwordComparison){

               let token = jwt.sign(
                   {
                       id: loginUser.id
                   },
                   process.env.JWT_SECRET,
                   {
                       expiresIn:60*60*24
                   }
               );

               res.status(200).json({
                   user: loginUser,
                   message:"User successfully logged in!",
                   token
               });
           }else{
               res.status(401).json({
                   message: "Incorrect email or password"
               });
           }
       }else {
           res.status(401).json({
               message:"Incorrect email or password"
           })
       }

    }catch(err){
        res.status(500).json({
            message:"Error logging in!"
        });

    }
})

module.exports = router;