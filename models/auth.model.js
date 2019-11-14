const mongoose = require("mongoose")

const bcrypt = require("bcrypt")

const DB_URL = "mongodb://localhost:27017/shop";

const userSchema = mongoose.Schema({
    username: String,
    email: String,
    password: String
})

const User = mongoose.model("user", userSchema)

exports.createNewUser = (username, email, password) => {

    return new Promise((resolve, reject) => {
        mongoose.connect(DB_URL).then(() => {
            return User.findOne({email: email})
        }).then(user => {
            if(!user) {
                mongoose.disconnect()
                reject('Email is already used')
            }
            else {
                return bcrypt.hash(password, 10)
            }
        }).then(hashedPassword => {
            let user = new User({
                username: username,
                email: email,
                password: hashedPassword
            })
            return user.save()
        }).then(() => {
            mongoose.disconnect()
            resolve()
        }).catch(err => {
            mongoose.disconnect()
            reject(err)
        })
    })
}

exports.login = (email, password) => {
    return new Promise((resolve, reject) => {
        mongoose.connect(DB_URL).then(() => User.findOne({email: email})).then(user => {
            if(!user){
                mongoose.disconnect()
                reject('The user is not matches')
            }else{
                bcrypt.compare(password, user.password).then(same => {
                    if(!same){
                        mongoose.disconnect()
                        reject('Your password or email is invalid')
                    }else{
                        mongoose.disconnect()
                        resolve(user._id)
                    }
                })
            }
        }).catch(err => {
            mongoose.disconnect()
            reject(err)
            console.log(err)
        })
    })
}