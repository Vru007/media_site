const axios = require('axios');
const jwt = require('jsonwebtoken');
const { oauth2Client } = require('../utils/googleConfig');
const Users = require('../models/user');
const dotenv = require('dotenv');
dotenv.config();

exports.googleAuth = async (req, res, next) => {
    const code = req.query.code;
    
    if (!code) {
        return res.status(400).json({
            message: 'Authorization code is required'
        });
    }

    try {
        
        const googleRes = await oauth2Client.getToken(code).catch(error => {
            console.error('Error exchanging code for tokens:', error.message);
            throw new Error('Failed to exchange authorization code');
        });

        
        oauth2Client.setCredentials(googleRes.tokens);

        
        const userInfoResponse = await axios.get(
            'https://www.googleapis.com/oauth2/v1/userinfo',
            {
                params: {
                    alt: 'json',
                    access_token: googleRes.tokens.access_token
                },
                validateStatus: status => status === 200
            }
        ).catch(error => {
            console.error('Error fetching user info:', error.response?.data || error.message);
            throw new Error('Failed to fetch user information from Google');
        });

        const { email, name, picture } = userInfoResponse.data;

        if (!email) {
            throw new Error('Email not received from Google');
        }

        
        
        let user = await Users.findOne({ email }).catch(error => {
            console.error('Database query error:', error);
            throw new Error('Database error while looking up user');
        });

        if (!user) {
            try {
                user = await Users.create({
                    name,
                    email,
                    image: picture,
                });
            } catch (error) {
                console.error('Error creating new user:', error);
                throw new Error('Failed to create new user');
            }
        }

        
        if (!process.env.JWT_SECRET || !process.env.JWT_TIMEOUT) {
            throw new Error('JWT configuration missing');
        }

        const { _id } = user;
        const token = jwt.sign(
            { _id, email },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_TIMEOUT }
        );

        
        return res.status(200).json({
            message: 'Authentication successful',
            token,
            user,
        });

    } catch (error) {
        console.error('Google authentication error:', error);
        
        
        return res.status(500).json({
            message: error.message || 'Internal Server Error',
        });
    }
};