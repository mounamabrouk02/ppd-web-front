const router = require("express").Router()
const jwt = require("jsonwebtoken")
const User = require("../modules/User");

router.post("/", async (req, res) => {
    const {username, password} = req.body

    if (!username || !password) {
        return res.status(422).json({
            message: "Please provide username and password"
        })
    }
    const user = await User.findOne({username})

    if (!user || !(
        await new Promise((resolve, reject) => {
            user.comparePassword(password, (err, isMatch) => {
                if (err) {
                    resolve(false)
                } else {
                    resolve(isMatch)
                }
            })
        })
    )) {
        return res.status(404).json({
            message: "User not found"
        })
    }
    if (!user.isConfirmed) {
        return res.status(400).json({
            message: "Le compte de cet utilisateur n'est pas confirmé"
        })
    }
    const token = jwt.sign({
            username: user.username,
            id: user._id,
            role: user.role
        },
        process.env.JWT_SECRET, {expiresIn: "7d"}
    )
    return res.json({
        token: token,
        fullName: user.fullName(),
    });
})

router.post("/register", async (req, res) => {
    const {username, password, firstName, lastName, email, birthDate} = req.body

    if (!username || !password || !firstName || !lastName || !email || !birthDate) {
        return res.status(422).json({
            message: "Please provide valid inputs"
        })
    }
    const user = await User.findOne({username})
    if (user) {
        return res.status(409).json({
            field: "phone",
            message: "L'utilisateur avec le numéro de téléphone fourni existe déjà"
        })
    }
    const newUser = new User({
        username,
        password,
        firstName,
        lastName,
        email,
        birthDate
    })
    await newUser.save()
    return res.json({
        message: "User created",
        userId: newUser._id
    })
});

router.post("/confirmation", async (req, res) => {
    const {userId, phoneCode, emailCode} = req.body
    if (!userId || !phoneCode || !emailCode) {
        return res.status(422).json({
            message: "Please provide valid inputs"
        })
    }
    if (phoneCode !== "0000" || emailCode !== "0000") {
        return res.status(400).json({
            message: "E-mail ou code de téléphone inséré invalide"
        })
    }
    const user = await User.findById(userId)
    if (!user) {
        return res.status(404).json({
            message: "User not found"
        })
    }
    user.isConfirmed = true
    await user.save()
    return res.json({
        message: "User confirmed",
        username: user.username
    })
})

module.exports = router;