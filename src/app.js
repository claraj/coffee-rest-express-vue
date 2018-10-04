const express = require('express')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const mongoose = require('mongoose')
const restify = require('express-restify-mongoose')
const app = express()
const router = express.Router()
const serveStatic = require('serve-static')
const path = require('path')

const staticPath = path.join(__dirname, '..', 'client', 'dist')
console.log(staticPath)
app.use(serveStatic(staticPath))


app.use(bodyParser.json())
app.use(methodOverride())

mongoose.connect(process.env.MONGO_URL)

const coffeeShop = require('./models/coffeeShop')

restify.serve(router, coffeeShop)

app.use(router)

app.listen(process.env.PORT || 3000, () => {
  console.log('Express server on port 3000')
})
