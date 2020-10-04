const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const validator = require('validator')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true, // set field as required
        trim: true,     // removes spaces from beginning and end of a string
        lowercase: true, // use .toLowerCase() on the string
        validate: (value) => {
            if (!validator.isEmail(value)) {
                throw new Error('Email is invalid!')
            }
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
        trim: true
    },
    token: {
        type: String
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    notifications: {
        type: Array
    }
})

// Create a virtual property (a link between task.owner -> user._id)
// in order to set a relationship between the two.
userSchema.virtual('orders', {
    ref: 'Order',
    localField: '_id',
    foreignField: 'customerID'
})

// This function generates a jwt and stores 
// it in the database for the current user
userSchema.methods.generateAuthToken = async function () {
    const user = this

    const token = jwt.sign({ _id: user._id.toString() }, 'thisisasecrettoken')
    user.token = token

    await user.save()

    return token
}

// This function gets email and password, and verifies them
userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({ email: email })

    if (!user) {
        throw new Error('User not found')
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
        throw new Error('Password does not match')
    }

    return user
}

// Middleware for hashing the password using bcrypt algorithm
// This runs just before saving the document
userSchema.pre('save', async function (next) {
    const user = this

    // Check if password was modified to prevent double hashing
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }

    if (user.notifications.length > 5) {
        user.notifications.pop()
    }

    next()
})

const User = mongoose.model('User', userSchema)

module.exports = User