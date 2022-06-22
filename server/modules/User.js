const {upperCaseFirstLetter}  = require("../utils/UpperCaseFirstLetter");

const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
const {Roles} = require("../constants/Roles");
const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true,
        transform:upperCaseFirstLetter
    },
    lastName: {
        type: String,
        required: true,
        transform:upperCaseFirstLetter
    },
    email: {
        type: String,
        required: true
    },
    birthDate: {
        type: Date,
    },
    isConfirmed:{
        type: Boolean,
        default: false
    },
    role: {
        type: String,
        enum: Object.values(Roles),
        default: Roles.USER
    }
})
//bcrypt password of UserSchema on save
UserSchema.pre("save", function (next) {
    const user = this
    if (user.isModified("password")) {
        bcrypt.hash(user.password, 10, function (err, hash) {
            if (err) {
                return next(err)
            }
            user.password = hash
            next()
        })
    } else {
        next()
    }
})
//compare password of UserSchema on login
UserSchema.methods.comparePassword = function (candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
        if (err) {
            return cb(err)
        }
        cb(null, isMatch)
    })
}
UserSchema.methods.fullName = function () {
    return `${upperCaseFirstLetter(this.firstName)} ${upperCaseFirstLetter(this.lastName)}`
}
const User = mongoose.model("users", UserSchema)
module.exports = User


