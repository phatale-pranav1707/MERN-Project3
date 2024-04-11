const express = require('express')
const { body, validationResult } = require('express-validator');
var bcrypt = require('bcryptjs');
const fetchuser = require('../middlewares/fetchuser')
var jwt = require('jsonwebtoken');

const User = require('../models/User')
const router = express.Router();

const JWT_SECRET = "pranavisagoodcoder"

router.post('/createuser', [
    body('email').isEmail(),
    body('password').isLength({ min: 5 }),
    body('name').isLength({ min: 3 }),

], async (req, res) => {
    let success = false;


    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {

        let user = await User.findOne({ email: req.body.email });
        if (user) {
            res.status(400).json({ error: "this user alredy exist. Try out with different email" })
        }

        const salt = bcrypt.genSaltSync(10);
        const secPass = bcrypt.hashSync(req.body.password, salt)


        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: secPass
        })

        const data = {
            user: {
                id: user.id
            }
        }

        const authtoken = await jwt.sign(data, JWT_SECRET);
        success = true

        let name=user.name;
        let email=user.email

       

        res.send({ success, authtoken,name,email }) 

    } catch (error) {
        res.status(400).json({ error: "error is happened", message: error.message })
    }
})


router.post('/login', [
    body('email').exists(),

], async (req, res) => {

    let success = false;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {

        let user = await User.findOne({ email: req.body.email });
        if (!user) {
            res.status(400).json({ error: "User with this email not exists" })
        }

        const passcompare = bcrypt.compareSync(req.body.password, user.password);

        if (!passcompare) {
            res.status(400).json({ error: "login with correct creds" })

        }

        const data = {
            user: {
                id: user.id
            }
        }

        const authtoken = await jwt.sign(data, JWT_SECRET);
        success = true

        let name=user.name;
        let email=user.email

       

        res.send({ success, authtoken,name,email })

    } catch (error) {
        res.status(400).json({ error: "error is happened", message: error.message })
    }
})



router.get('/getuser', fetchuser, async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {

        const userId = (req.user.id);
        const user = await User.findById(userId)
        let name=user.name;
        let email=user.email;
        let date=user.date;

        

        res.json({user,name,email,date})
        // res.send({name,email})


    } catch (error) {
        res.status(400).json({ error: "error is happened", message: error.message })
    }
})

module.exports = router;