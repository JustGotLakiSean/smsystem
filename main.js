const express = require('express')
const mongoose = require('mongoose')
const app = express()
const port = 3000

app.get('/', (req, res) => {
    res.send('yes?')
})

app.listen(3000, () => {
    console.log(`Port 3000`)
})