const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../../models/user');
const jwtSecret = process.env.JWT_SECRET;
const tokenExpires = process.env.JWT_EXPIRES;

router.post('/login', async (req, res) => {
    try{
        const { email, password } = req.body;
        if (!email) {
            return res
                .status(400)
                .json({ error: 'Eemail address is required.' });
            }
        
            if (!password) {
            return res.status(400).json({ error: 'Password is required.' });
            }

            const user = await User.findOne({ email });

            if (!user) {
                return res
                .status(400)
                .send({ error: `Cannot find user with email ${email}.` });
            }

            const isMatch = await bcrypt.compare(password, user.password);

            if (!isMatch) {
                return res.status(400).json({
                    success: false,
                    error: 'Password is Incorrect'
                });
            }

            const payload = {
                id: user.id
            };

            const token = jwt.sign(payload, jwtSecret, { expiresIn: tokenExpires });
            if (!token) {
                throw new Error();
            }
          
            res.status(200).json({
                success: true,
                token: `Bearer ${token}`,
                user: {
                    id: user.id,
                    username: user.username,
                    email: user.email,
                    role: user.role
                }
            });
    }catch (error) {
        res.status(400).send(error);
    }
});

router.post('/register', async (req, res) => {
    try{
        console.log("register a new user")
        const { email, username, password } = req.body;

        if (!email) {
            return res
              .status(400)
              .json({ error: 'You must enter an email address.' });
        }

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res
              .status(400)
              .json({ error: 'That email address is already in use.' });
        }
      
        if (!username) {
            return res.status(400).json({ error: 'You must enter your user name.' });
        }
      
        if (!password) {
            return res.status(400).json({ error: 'You must enter a password.' });
        }

        const user = new User({
            email,
            password,
            username
        });
      
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(user.password, salt);

        user.password = hash;
        const registeredUser = await user.save();

        const payload = {
            id: registeredUser.id
        };

        const token = jwt.sign(payload, jwtSecret, { expiresIn: tokenExpires });

        if (!token) {
            throw new Error();
        }

        res.status(200).json({
            success: true,
            token: `Bearer ${token}`,
            user: {
                id: registeredUser.id,
                username: registeredUser.username,
                email: registeredUser.email,
                role: registeredUser.role
            }
        });
    } catch (error) {
        res.status(400).send(error);
    }
})

module.exports = router;