const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
// Setting Paths
const publicPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setting static path 
app.use(express.static(publicPath))

// Setting handlebar engine and views directory
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Get requests
app.get('', (req, res)=>{
    res.render('index', {
        title: 'Weather',
        name: 'Aditya'
    })
})

app.get('/about', (req, res) =>{
    res.render('about', {
        title: 'About Page',
        name: 'Aditya'
    })
})

app.get('/help', (req, res)=>{
    res.render('help',{
        title: 'Help Page',
        message: 'Help needed',
        name: 'Aditya'
    })
})

app.get('/products', (req, res)=>{
    if(!req.query.search){
        return res.send({
            error: 'No search term provided'
        })
    }
    res.send({
        products: []
    })
})

app.get('/weather', (req, res)=>{
    if(!req.query.address){
        return res.send({
            error: 'Address not provided'
        })
    }

    geocode(req.query.address, (error, {latitude, longitude, location} = {})=>{
        if(error){
            return res.send({
                error: error
            })
        }
        
        forecast(longitude, latitude, (error, forecastData) => {
            if(error){    
                return res.send({
                    error: error
                })
            }
            res.send({
                location: location,
                forecast: forecastData,
                address: req.query.address
            })
        })
    })   
})

app.get('/help/*', (req,res)=>{
    res.render('404page',{
        message: 'Help article not found'
    })
})

app.get('*', (req, res)=>{
    res.render('404page',{
        message: 'Page not found.'
    })
})

app.listen(3000, () =>{
    console.log('startup on 3000')
})