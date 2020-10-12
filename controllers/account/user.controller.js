const userModel = require('../../models/user.model');

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { registerValidation, loginValidation } = require('../../utilities/auth-validation');

exports.userLogin = async(req, res) => {
    const { error } = loginValidation(req.body);
    if (error) {
        return res.status(400).json(error.details[0].message);
    }
    try {
        //check if admin exists
        const user = await userModel.findOne({ email: req.body.email });
        if (!user) {
            // return res.status(400).json('Email is incorrect');
            return res.status(400).json({
                msg: 'email is incorrect'
            })
        }
        //check if password is correct
        const validPassword = await bcrypt.compare(req.body.password, user.password);
        if (!validPassword) {
            return res.status(400).json({
                msg: 'password is incorrect'
            });
        }
        //assign token
        const token = jwt.sign({ id: user._id, exp: Math.floor(Date.now() / 1000) + (60 * 60 * 72) }, process.env.TOKEN_SECRET);
        res.header('auth-token', token);

        res.json({
            msg: 'user successfully logged in',
            data: {
                email: user.email,
                userId: user._id,
                token
            }

        })
    } catch (error) {
        res.status(400).json({
            err: error
        });
    }
}

exports.userRegister = async(req, res) => {
    //check for validation errors
    const { error } = registerValidation(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }
    try {
        // check if user already exists
        const emailExist = await userModel.findOne({ email: req.body.email });
        if (emailExist) {
            return res.status(400).send('Email already exists');
        }

        // hash password
        const salt = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(req.body.password, salt);

        // get req data
        const user = new userModel({
            fullname: req.body.fullname,
            email: req.body.email,
            password: hashPassword
        });

        //save admin

        const newUser = await user.save();
        res.json({
            msg: 'User Successfully Created',
            data: {
                id: user._id,
                fullname: user.fullname,
                email: user.email,
            },
        })
    } catch (error) {
        res.status(400).json({ error });
    }
}

exports.getAllUsers = async(req, res) => {
    try {
        const users = await userModel.find({}).select('_id fullname email');
        res.json({
            msg: "Fetched all users successfully",
            data: users
        })
    } catch (error) {
        console.log(error)
        res.status(400).json({ error });
    }
}