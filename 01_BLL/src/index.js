const express = require('express')
require('../../00_DAL/mongoose') // This establishes the connection to the database
const cors = require('cors')

// Import mongoose models
const User = require('../../00_DAL/models/user')
const Order = require('../../00_DAL/models/order')

// Import routes
const userRouter = require('./routes/user')
const orderRouter = require('./routes/order')

const app = express()
app.use(cors())
app.use(express.static(process.cwd() + "/02_UIL/client/dist/client/"));

const port = process.env.PORT || 3000

app.use(express.json())

// Use routes
app.use(userRouter)
app.use(orderRouter)


app.get('/', (req, res) => {
    res.sendFile(process.cwd() + "/02_UIL/client/dist/client/index.html")
});




app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})