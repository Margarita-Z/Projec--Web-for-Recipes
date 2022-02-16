const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

require('dotenv').config()

module.exports = {
    register: async (req, res) => {
        try {
            req.body.email = req.body.email.toLowerCase();
            let user = await User.findOne({ email: req.body.email })
            if (user) {
                throw new Error("This email is already taken")
            } else {
                if (req.body.password === req.body.confirmationPassword) {
                    req.body.password = bcrypt.hashSync(req.body.password);
                    //req.body.image = "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png";
                    user = await User.create(req.body);
                } else {
                    throw new Error("Passwords don't match")
                }
            }
            res.send({
                error: false,
                message: 'New user record created!',
                user: user
            });
        } catch (error) {
            res.send({
                error: true,
                message: error.message
            });
        }
    },
    login: async (req, res) => {

        try {
            const user = await User.findOne({ email: req.body.email });
            if (!user) {
                throw new Error('Email does not exite');
            }
            if (!bcrypt.compareSync(req.body.password, user.password)) {
                throw new Error('Passwords do not match');
            }
            const payload = {
                id: user._id,
                email: user.email
            }
            const token = jwt.sign(payload, process.env.AUTH_SECRET, {
                expiresIn: '10s'
            });
            res.send({
                error: false,
                message: 'User logged in',
                token: token,
                user: user
            });
        } catch (error) {
            res.send({
                error: true,
                message: error.message
            });
        }
    },
    logout: async (req, res) => {
        try {
            const paylod = {
                id: req.user._id,
                email: req.user.email
            }
            const token = jwt.sign(paylod, 'Invalid secret key', {
                expiresIn: '1s'
            });
            res.send({
                error: false,
                message: 'You have been logged out',
                token: token
            });
        } catch (error) {
            res.send({
                error: true,
                message: error.message
            });

        }
    },
    MyProfile: async (req, res) => {
        try {
            const user = await User.findById(req.user.id, req.body)
            res.send({
                err: false,
                message: 'My profile',
                user: user
            })
        }
        catch (err) {
            res.send({
                err: true,
                message: err.message
            })
        }
    },
    updataMyProfile: async (req, res) => {
        try {

            const user = await User.findByIdAndUpdate(req.user.id, req.body)
            res.send({
                err: false,
                message: 'Updated user',
                user: user
            })

        }
        catch (err) {
            res.send({
                err: true,
                message: err.message
            })

        }
    },
    updataMyImage:  async (req, res) => {
        console.log(req.file)
        try {
             req.body.user = req.user.id;
                req.body.image = `images/user/${req.file.filename}`;
             
             const user = await User.findByIdAndUpdate(req.user.id, req.body)
            res.send({
                err: false,
                message: 'Updated user',
                user: user
            })

        }
        catch (err) {
            res.send({
                err: true,
                message: err.message
            })

        }
    },
}