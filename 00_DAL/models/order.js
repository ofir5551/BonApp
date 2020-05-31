const mongoose = require('mongoose')
const User = require('./user')

const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    items: {    // Add validation to quantity and price so it can't be negative (add Item sub-schema?)
        type: Array,
        required: true
    },
    isPaid: {
        type: Boolean,
        default: false
    },
    totalPrice: {
        type: Number,
        default: 0
    },
    date: {
        type: String
    },
    time: {
        type: String
    }
})

// This function runs before saving the new order and does the following:
// 1. Calculate the total price of the order into 'totalPrice' property
// 2. Get the date and time of the order into 'date' and 'time' properties
// .........................................................................
orderSchema.pre("save", async function (next) {
    const order = this

    order.items.forEach(item => {
        order.totalPrice += item.price * item.quantity
    })

    const today = new Date();
    let currentDate = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate()
    let currentTime = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds()

    order.date = currentDate
    order.time = currentTime

    next()
})


const Order = mongoose.model('Order', orderSchema)

module.exports = Order