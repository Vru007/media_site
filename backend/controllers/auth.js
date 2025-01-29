const axios = require('axios');
const jwt = require('jsonwebtoken');
const { oauth2Client } = require('../utils/googleConfig')
const Users = require('../models/user');
const dotenv=require('dotenv')
dotenv.config();
 exports.googleAuth = async (req, res, next) => {
    const code = req.query.code;
    console.log("code: ",code);
    try {

        const googleRes = await oauth2Client.getToken(code);
        oauth2Client.setCredentials(googleRes.tokens);
        const response = await axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${googleRes.tokens.access_token}`);
        const { email, name, picture } = response.data;
        // console.log("google_api_response: ",response.data);
        let user = await Users.findOne({email})
        if (!user) {
            user = await Users.create({
                name,
                email,
                image: picture,
            });
        }
        const { _id } = user;
        const token = jwt.sign({ _id, email },
            process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_TIMEOUT,
        });
        res.status(200).json({
            message: 'success',
            token,
            user,
        });
    } 
     catch (err){
        res.status(500).json({
            message: "Internal Server Error"
        })
     }
};