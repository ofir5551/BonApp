const express = require('express')
const router = new express.Router()
const auth = require('../middleware/auth')
const authAsAdmin = require('../middleware/authAsAdmin')
const User = require('../../../00_DAL/models/user')

// Sign up new user
router.post('/users', async (req, res) => {
    const user = new User(req.body)

    try {
        await user.save()
        const token = await user.generateAuthToken()

        res.status(201).send({ user })
    } catch (err) {
        res.status(400).send(err)
    }
})

// Log in existing user
router.post('/users/login', async (req, res) => {

    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()

        res.send({ user, token })
    } catch (err) {
        res.status(400).send(err)
    }
})

// Log out a user (delete token)
router.post('/users/logout', auth, async (req, res) => {
    try {
        req.user.token = ''
        await req.user.save()

        res.status(200).send({ message: `${req.user.name} has logged out` })
    } catch (err) {
        res.status(500).send()
    }
})

// ADMIN - Get all users
router.get('/admin/users', authAsAdmin, async (req, res) => {
    try {
        const users = await User.find({})
        res.send(users)
    } catch (err) {
        res.status(500).send()
    }
})

// ADMIN - Get specific user by id
router.get('/admin/user/:id', authAsAdmin, async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
        if (user)
            res.status(200).send(user)
        else
            res.status(404).send({ 'error': 'User not found!' })
    } catch (err) {
        res.status(500).send(err)
    }
})

// ADMIN - Delete a user by id
router.delete('/admin/users/:id', authAsAdmin, async (req, res) => {
    try {
        const user = await User.findByIdAndRemove(req.params.id)

        if (user)
            res.status(200).send(user)
        else
            res.status(404).send({ 'error': 'User not found!' })
    } catch (err) {
        res.status(500).send(err)
    }
})

// Get currently logged in user
router.get('/users/home', auth, async (req, res) => {
    res.send(req.user)
})

// Add a new notification to the user
router.post('/notification', auth, async (req, res) => {
    try {
        req.user.notifications.unshift(req.body) // unshift inserts the notification to the beginning of the array
        await req.user.save()

        res.status(200).send(req.body)
    } catch (err) {
        res.status(500).send()
    }
})

// Get all user's notifications
router.get('/notification', auth, async (req, res) => {
    try {
        res.status(200).send(req.user.notifications)
    } catch (err) {
        res.status(500).send()
    }
})

// Mark all user's notifications as seen
router.post('/notification/read', auth, async (req, res) => {
    try {
        req.user.notifications.forEach((notification) => { notification.seen = true })

        await User.findByIdAndUpdate(req.user.id, {notifications: req.user.notifications})

        await req.user.save()

        res.status(200).send(req.user.notifications)
    } catch (err) {
        res.status(500).send()
    }
})


// TODO : Set /admin route for all admin functions and routes
// TODO : Update a user

module.exports = router