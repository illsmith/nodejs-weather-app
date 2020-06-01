const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

// DEFINE PATHS FOR EXPRESS CONFIG
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')


// SETUP HANDLEBARS ENGINE AND VIEWS LOCATION
app.set('view engine', 'hbs')
app.set('views', viewsPath)

// SET UP STATIC DIRECTORY TO SERVE
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index')
})

app.get('/about', (req, res) => {
    res.render('about')
})

app.get('/help', (req, res) => {
    res.render('help')
})

// app.get('/weather', (req, res) => {
//     res.send({
//         forecast: 'Its Snowing',
//         location: 'San Diego'
//     })
// })
app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: "YOU MUST PROVIDE AN ADDRESS"
        })
    }

    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error })
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
})
app.get('/help/*', (req, res) => {
    res.status(404).send()
})

app.get('*', (req, res) => {
    res.status(404).send()
})

app.listen(port, () => {
    console.log('SERVER IS LIT ON' + port)
})


// const express = require('express')
// const request = require('postman-request')

// const app = express()
// const port = 3000
// app.use(express.static('public'))

// app.get('/', (req, res) => res.send('Hello World!'))


// app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))