const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/users');

exports.login = async(request,response) =>{
    try{
        const {email,password}=request.body;

       
        console.log('Type of password:', typeof password);
        // console.log('Type of hashedPassword:', typeof user.password);


        const user = await User.findOne({email});
        if (!user){
            return response.status(401).json({error:'Invalid email'})
        }


        const check_password= await User.findOne({password});
        if (!check_password){
            return response.status(401).json({error:'wrong password'})
        }

        
        // const passwordMatch = await bcrypt.compare(password,user.password)
        // if (!passwordMatch){
        //     return response.status(401).json({error:'Wrong password'});
        // }

        
        console.log('JWT_SECRET:', '111');
        const token = jwt.sign({ userId: user._id },'111', { expiresIn: '1h' })
        console.log('JWT_SECRET:', process.env.JWT_SECRET);

        response.json({ token, user });
    }catch(error){
        console.error(error);
        response.status(500).json({error:'Failed to login'});
    }
};